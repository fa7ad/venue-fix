import path from 'path'
import Express from 'express'

import Pouch from 'pouchdb'
import ExpressPouchDB from 'express-pouchdb'

import bcrypt from 'bcrypt'
import logger from 'morgan'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import PouchSession from 'session-pouchdb-store'
import { Strategy as LocalStrategy } from 'passport-local'

import React from 'react'
import App from './App'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import User from './server/userModel'
import renderPage from './server/renderPage'

const PouchDB = Pouch.defaults({
  prefix: path.resolve(process.env.RAZZLE_HOME, 'db', '.db__')
})

const app = Express()

app.disable('x-powered-by')
app.use(Express.static(process.env.RAZZLE_PUBLIC_DIR, { index: false }))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'venue is fixed',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6e5
    },
    store: new PouchSession(PouchDB)
  })
)
app.use('/__db', ExpressPouchDB(PouchDB))

const usersDB = new PouchDB(process.env.RAZZLE_DB_PREFIX + 'users')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'phone',
      passwordField: 'password',
      session: true
    },
    (phone, plain, cb) =>
      usersDB
        .get(phone)
        .then(usr =>
          cb(null, usr && bcrypt.compareSync(plain, usr.password) ? usr : false)
        )
        .catch(cb)
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})

passport.deserializeUser(function (id, cb) {
  usersDB.get(id).catch(err => cb(err)).then(user => cb(null, user))
})

app.use(passport.initialize())
app.use(passport.session())

app
  .route('/auth')
  .post(
    passport.authenticate('local', {
      successReturnToOrRedirect: '/admin',
      failureRedirect: '/auth'
    })
  )
  .get(function (req, res) {
    res.redirect('/?auth=signin')
  })
  .put(function (req, res) {
    if (!req.body) res.status(400).redirect('/')
    try {
      const { phone: _id, password, name, address, admin } = User(req.body)
      bcrypt
        .hash(password, 10)
        .then(hash => ({ _id, password: hash, name, address, admin }))
        .then(user => usersDB.put(user))
        .then(_ => {
          res.json({ success: true })
        })
    } catch (e) {
      res.status(400).json({ success: false })
    }
  })

app.get(['/signout', '/logout'], function (req, res) {
  req.logout()
  res.redirect('/')
})

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

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

usersDB.info(function (err) {
  if (err) {
    console.error('[PouchDB]', 'Failed to connect to CouchDB')
    console.error('[PouchDB]', "CouchDB server doesn't seem to be running")
    process.exit(1)
  }
  console.log('[PouchDB]', 'Connected to CouchDB')
  bcrypt
    .hash('admin i am', 10)
    .then(password =>
      usersDB.put({
        _id: '01666666666',
        password,
        name: 'Administrator',
        address: 'Hell',
        admin: true
      })
    )
    .then(_ => console.log('[PouchDB]', 'Added demo administrator'))
    .catch(_ => console.error('[PouchDB]', 'Demo administrator already exists'))
})

export default app
