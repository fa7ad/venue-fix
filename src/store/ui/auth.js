import { types } from 'mobx-state-tree'

const { model, boolean, optional } = types

const Auth = model('Auth', {
  modal: optional(boolean, false),
  register: optional(boolean, false)
}).actions(self => ({
  showModal (e) {
    self.modal = true
  },
  hideModal (e) {
    self.modal = false
  },
  toReg () {
    self.register = true
  },
  toLog () {
    self.register = false
  }
}))

export default Auth
