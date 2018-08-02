import { types } from 'mobx-state-tree'
import { inject, observer } from 'mobx-react'

const Navbar = types
  .model({
    _color: types.optional(types.string, 'dark'),
    _page: types.maybe(types.string),
    isOpen: types.optional(types.boolean, false)
  })
  .actions(self => ({
    toDark () {
      self._color = 'dark'
    },
    toNone () {
      self._color = 'transparent'
    },
    toggle: e => {
      self.isOpen = !self.isOpen
    },
    _toPage (page) {
      self._page = page
      self.isOpen = false
    },
    getColor (page = 'home') {
      if (page !== self._page) {
        self._toPage(page)
        self[page === 'home' ? 'toNone' : 'toDark']()
      }
      return self._color
    }
  }))

const Auth = types
  .model({
    modal: types.optional(types.boolean, false),
    signup: types.optional(types.boolean, false)
  })
  .actions(self => ({
    showModal (e) {
      self.modal = true
    },
    hideModal (e) {
      self.modal = false
    },
    toReg () {
      self.signup = true
    },
    toLog () {
      self.signup = false
    }
  }))

const Dashboard = types
  .model({
    activePage: types.optional(types.string, 'dashboard')
  })
  .actions(self => ({
    activate (page = 'dashboard') {
      self.activePage = page
    }
  }))

const UiStore = types.model({
  navbar: Navbar,
  auth: Auth,
  dash: Dashboard
})

const injObser = (...stores) => com => inject(...stores)(observer(com))
const uiObserver = injObser('ui')

export { injObser, uiObserver }
export default UiStore
