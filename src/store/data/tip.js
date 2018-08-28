import { types } from 'mobx-state-tree'

const { model, optional, string, Date: DateX } = types

const Tip = model('Tip', {
  heading: optional(string, ''),
  time: optional(DateX, new Date()),
  body: optional(string, '')
}).actions(self => ({
  set (tip) {
    Object.assign(self, tip)
  }
}))

export default Tip
