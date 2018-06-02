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
      return self._color
    },
    toNone () {
      self._color = 'transparent'
      return self._color
    },
    toggle: e => {
      self.navIsOpen = !this.navIsOpen
      return self.navIsOpen
    },
    _toPage (page) {
      self._page = page
    }
  }))
  .views(self => ({
    color (page = 'home') {
      if (page !== self._page) {
        self._toPage(page)
        if (page === 'home') self.toNone()
        else self.toDark()
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

const UiStore = types.model({
  navbar: Navbar,
  auth: Auth
})

const injObser = store => com => inject(store)(observer(com))
const uiObserver = injObser('ui')

export { injObser, uiObserver }
export default UiStore
