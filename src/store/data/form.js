import { types } from 'mobx-state-tree'
const { model, optional, string, array, boolean, number, Date: DateX } = types

const Form = model('EventForm', {
  date: optional(DateX, new Date()),
  location: optional(string, ''),
  guests: optional(string, '0'),
  event: optional(string, ''),
  catering: optional(boolean, false),
  budget: optional(array(number), [0, 50000])
}).actions(self => ({
  set (form) {
    Object.assign(self, form)
  }
}))

export default Form
