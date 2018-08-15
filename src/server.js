import path from 'path'
import Express from 'express'

import Pouch from 'pouchdb'

import bcrypt from 'bcryptjs'
import logger from 'morgan'
import bodyParser from 'body-parser'
import session from 'express-session'
import PouchSession from 'session-pouchdb-store'
import { ensureLoggedIn } from 'connect-ensure-login'

import App from './App'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import auth from './server/auth'
import renderPage from './server/renderPage'

const PouchDB = Pouch.defaults({
  prefix: path.resolve(process.env.RAZZLE_HOME, 'db', '.db__')
})
const createPouchDB = db => new PouchDB(process.env.RAZZLE_DB_PREFIX + db)
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const usersDB = createPouchDB('users')
const categoriesDB = createPouchDB('tags')

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

auth(app, usersDB)

app
  .route('/user')
  .get(ensureLoggedIn('/401'), (req, res) => {
    usersDB
      .get(req.user._id)
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ success: false, err }))
  })
  .post(ensureLoggedIn('/401'), (req, res) => {
    usersDB
      .get(req.user._id)
      .then(({ password, _rev, admin }) => {
        const { name, phone, address, password: pwd } = Object.assign(
          {},
          req.user,
          req.body
        )
        return usersDB.put({
          name,
          _id: phone,
          address,
          password: req.body.password ? pwd : password,
          _rev,
          admin
        })
      })
      .then(rep => res.json({ success: rep.ok }))
      .catch(rep => res.status(500).json({ success: false, error: rep }))
  })

app.route('/tags').get(ensureLoggedIn('/401'), (req, res) => {
  categoriesDB
    .allDocs({ include_docs: true })
    .then(({ rows: categories }) => res.json({ success: true, categories }))
    .catch(e => res.status(404).json({ success: false }))
})

app.get('/:code', (req, res, next) => {
  const { code } = req.params
  if (code && code > 399 && code < 512) {
    res.status(code).json({ success: false })
  } else next()
})

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
    console.error('[PouchDB]', 'Failed to connect to database')
    console.error('[PouchDB]', 'Database server error')
    return
  }

  console.log('[PouchDB]', 'Connected to database')

  // usersDB.get('01666666666').then(user => usersDB.remove(user))

  bcrypt
    .hash('i am admin', 10)
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
