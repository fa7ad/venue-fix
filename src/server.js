import Express from 'express'

import logger from 'morgan'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
/*
import Passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local' */

import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import renderPage from './server_utils/renderPage'
import connectDB from './server_utils/connectDB'
const usersDB = connectDB('users')
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = Express()

usersDB.info().then(_ => {
  console.log('[PouchDB]', 'Connected to CouchDB')
}).catch(_ => {
  console.error('[PouchDB]', 'Failed to connect to CouchDB')
})

app.disable('x-powered-by')

app.use(Express.static(process.env.RAZZLE_PUBLIC_DIR, { index: false }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'venue is fixed',
    resave: false,
    saveUninitialized: false
  })
)

app.get('/*', (req, res) => {
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
    const html = renderPage({
      assets,
      prodEnv: process.env.NODE_ENV === 'production',
      styleTags,
      markup
    })
    res.send(html)
  }
})

export default app
