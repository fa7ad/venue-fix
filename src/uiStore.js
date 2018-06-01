import { types } from 'mobx-state-tree'
import { inject, observer } from 'mobx-react'

const Navbar = types
  .model({
    _color: types.optional(types.string, 'transparent'),
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
    }
  }))
  .views(self => ({
    color (page = 'home') {
      if (page === 'event') self.toDark()
      if (page === 'home') self.toNone()
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
