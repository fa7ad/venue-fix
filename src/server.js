import Express from 'express'

import bcrypt from 'bcrypt'
import logger from 'morgan'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

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

usersDB
  .info()
  .then(_ => {
    console.log('[PouchDB]', 'Connected to CouchDB')
  })
  .catch(_ => {
    console.error('[PouchDB]', 'Failed to connect to CouchDB')
  })

passport.use(
  new LocalStrategy(
    {
      usernameField: 'phone',
      passwordField: 'password',
      session: true
    },
    function (phone, plainPassword, cb) {
      usersDB
        .find(phone)
        .then(user => {
          cb(
            null,
            user && bcrypt.compareSync(plainPassword, user.password)
              ? user
              : false
          )
        })
        .catch(err => cb(err))
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})

passport.deserializeUser(function (id, cb) {
  usersDB.find(id).catch(err => cb(err)).then(user => cb(null, user))
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

app.use(passport.initialize())
app.use(passport.session())

app.post(
  '/auth',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth'
  })
)

app.get('/*', (req, res) => {
  const context = {}
  const sheet = new ServerStyleSheet()
  const markup = renderToString(
    sheet.collectStyles(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
  )
  const styleTags = sheet.getStyleTags()
  if (context.url) return res.redirect(context.url)

  res.send(
    renderPage(process.env.NODE_ENV === 'production', {
      assets,
      styleTags,
      markup
    })
  )
})

export default app
