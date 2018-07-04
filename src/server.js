import express from 'express'
import React from 'react'

import App from './App'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const sheet = new ServerStyleSheet()
    const context = {}
    const markup = renderToString(
      sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      )
    )
    const styleTags = sheet.getStyleTags()
    if (context.url) res.redirect(context.url)
    else {
      const prodEnv = process.env.NODE_ENV === 'production'
      res.send(
        `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>venue-fix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.1/cosmo/bootstrap.min.css" rel="stylesheet" />

        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        <script src="${assets.client.js}" defer ${prodEnv ? 'crossorigin' : ''}></script>
        ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      )
    }
  })

export default server
