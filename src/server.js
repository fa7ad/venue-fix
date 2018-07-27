import express from 'express'
import React from 'react'

/* import path from 'path'
import up from 'levelup'
import sql from 'sqldown'
import enc from 'encoding-down' */

import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

/* const createDB = table =>
  up(
    enc(sql(path.resolve(__dirname, `${table || 'database'}.db`)), {
      valueEncoding: 'json'
    })
  ) */

// const venuesdb = createDB('venues')

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
// venuesdb.get('record1').then(console.log).catch(console.log)

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const { default: App } = require('./App')
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
