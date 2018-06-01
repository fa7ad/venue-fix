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
    },
    toNone () {
      self._color = 'transparent'
    },
    toggle: e => {
      self.navIsOpen = !this.navIsOpen
    }
  }))
  .views(self => ({
    color (page = 'home') {
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
