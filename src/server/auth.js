import bcrypt from 'bcryptjs'
import { ensureLoggedIn } from 'connect-ensure-login'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import User from './userModel'

export default function (app, usersDB) {
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
            cb(
              null,
              usr && bcrypt.compareSync(plain, usr.password) ? usr : false
            )
          )
          .catch(_ => cb(null, false))
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
        successRedirect: '/',
        failureRedirect: '/?auth=login'
      }),
      (req, res) => {
        res.redirect('/')
      }
    )
    .get(ensureLoggedIn('/401'), function (req, res) {
      res.json({ success: true })
    })
    .put(function (req, res) {
      if (!req.body) res.status(400).json({ success: false })
      try {
        const { phone: _id, password, name, address, admin } = User(req.body)
        bcrypt
          .hash(password, 10)
          .then(hash => ({ _id, password: hash, name, address, admin }))
          .then(user => usersDB.put(user))
          .then(_ => res.json({ success: true }))
          .catch(_ => res.status(409).json({ success: false }))
      } catch (e) {
        res.status(400).json({ success: false })
      }
    })

  app.get('/logout', function (req, res) {
    req.logout()
    res.json({ to: '/' })
  })

  app.get('/loggedIn', ensureLoggedIn('/401'), (req, res) => {
    res.json({ success: true, admin: req.user.admin })
  })
}
