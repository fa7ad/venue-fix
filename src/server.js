import path from 'path'
import Express from 'express'

import Pouch from 'pouchdb'
import { pickAll } from 'ramda'

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
const venuesDB = createPouchDB('venues')
const tipsDB = createPouchDB('tips')

const app = Express()
app.disable('x-powered-by')
app.use(Express.static(process.env.RAZZLE_PUBLIC_DIR, { index: false }))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb', extended: true }))
app.use(
  session({
    secret: 'venue is fixed',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 30e3
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

app
  .route('/tags')
  .get((req, res) => {
    categoriesDB
      .allDocs({ include_docs: true })
      .then(data => data.rows.map(row => row.doc))
      .then(categories => res.json({ success: true, categories }))
      .catch(_ => res.redirect('/404'))
  })
  .post(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    categoriesDB
      .post({ name: req.body.name })
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/500'))
  })
  .delete(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    categoriesDB
      .get(req.body.id)
      .then(res => categoriesDB.remove(res))
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/404'))
  })

app
  .route('/venues')
  .get((req, res) => {
    venuesDB
      .allDocs({ include_docs: true })
      .then(data => data.rows.map(row => row.doc))
      .then(venues => res.json({ success: true, venues }))
      .catch(_ => res.redirect('/404'))
  })
  .post(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    const data = pickAll(
      [
        'image',
        'title',
        'capacity',
        'description',
        'location',
        'catering',
        'categories',
        'rent'
      ],
      req.body
    )
    venuesDB
      .post(data)
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/500'))
  })
  .delete(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    venuesDB
      .get(req.body.id)
      .then(res => venuesDB.remove(res))
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/404'))
  })

app.get('/locations', (req, res) => {
  venuesDB
    .allDocs({ include_docs: true })
    .then(data => data.rows.map(r => r.doc.location || 'N/A'))
    .then(locations => [...new Set(locations)])
    .then(locations => res.json({ locations, success: true }))
})

app
  .route('/stips')
  .get((req, res) => {
    tipsDB
      .allDocs({ include_docs: true })
      .then(data => data.rows.map(r => r.doc))
      .then(tips => res.json({ success: true, tips }))
      .catch(_ => res.redirect('/404'))
  })
  .post(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    const data = pickAll(['time', 'heading', 'body'], req.body)
    tipsDB
      .post(data)
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/500'))
  })
  .put(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    const data = pickAll(['time', 'heading', 'body', 'id'], req.body)
    tipsDB
      .get(data.id)
      .then(tip => tipsDB.put(Object.assign(tip, data)))
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/500'))
  })
  .delete(ensureLoggedIn('/401'), (req, res) => {
    if (!req.user.admin) return res.redirect('/403')
    tipsDB
      .get(req.body.id)
      .then(res => tipsDB.remove(res))
      .then(_ => res.json({ success: true }))
      .catch(_ => res.redirect('/404'))
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
