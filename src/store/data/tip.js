import { types } from 'mobx-state-tree'

const { model, optional, string } = types

const Tip = model('Tip', {
  heading: optional(string, ''),
  time: optional(string, ''),
  body: optional(string, '')
}).actions(self => ({
  set (tip) {
    Object.assign(self, tip)
  }
}))

export default Tip
