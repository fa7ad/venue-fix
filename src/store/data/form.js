import { types } from 'mobx-state-tree'
const { model, optional, string, array, boolean, number, Date: DateX } = types

const Form = model('EventForm', {
  date: optional(DateX, new Date()),
  location: optional(string, ''),
  guests: optional(string, '0'),
  category: optional(string, ''),
  catering: optional(boolean, false),
  budget: optional(array(number), [0, 50000])
})
  .actions(self => ({
    set (form) {
      Object.assign(self, form)
    }
  }))
  .views(self => ({
    get () {
      const { date, location, guests, category, catering, budget } = self
      return { date, location, guests, category, catering, budget }
    }
  }))

export default Form
