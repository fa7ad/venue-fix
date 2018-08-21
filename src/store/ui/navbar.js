import { types } from 'mobx-state-tree'

const { model, optional, string, boolean } = types

const Navbar = model('Navbar', {
  color: optional(string, 'dark'),
  _page: optional(string, ''),
  isOpen: optional(boolean, false),
  isAdmin: optional(boolean, false),
  loggedIn: optional(boolean, false)
}).actions(self => ({
  toDark () {
    self.color = 'dark'
  },
  toNone () {
    self.color = 'transparent'
  },
  toggle: e => {
    self.isOpen = !self.isOpen
  },
  toPage (page) {
    if (page !== self._page) {
      self._page = page
      self.isOpen = false
      if (page === 'home') self.toNone()
      else self.toDark()
    }
  },
  authState (isLoggedIn = false, isAdmin = false) {
    self.loggedIn = isLoggedIn
    self.isAdmin = isAdmin
  },
  logOut () {
    self.authState(false, false)
  }
}))

export default Navbar
