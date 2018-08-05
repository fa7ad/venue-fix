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
    toPage (page) {
      if (page !== self._page) {
        self._page = page
        self.isOpen = false
        if (page === 'home') self.toNone()
        else self.toDark()
      }
    }
  }))
  .views(self => ({
    get color () {
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

const Tip = types.model({
  heading: types.optional(types.string, ''),
  time: types.optional(types.Date, new Date()),
  body: types.optional(types.string, '')
})

const TipModal = types
  .model({
    activeTip: Tip,
    visible: types.optional(types.boolean, false)
  })
  .actions(self => ({
    show () {
      self.visible = true
    },
    hide () {
      self.visible = false
    },
    async activate (tip) {
      try {
        self.activeTip = Tip.create(tip)
        return true
      } catch (e) {
        return false
      }
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

const Form = types
  .model({
    date: types.optional(types.Date, new Date()),
    location: types.optional(types.string, ''),
    guests: types.optional(types.string, '0'),
    event: types.optional(types.string, ''),
    catering: types.optional(types.boolean, false),
    budget: types.optional(types.array(types.number), [0, 50000])
  })
  .actions(self => ({
    set (form) {
      Object.assign(self, form)
    }
  }))

const UiStore = types.model({
  navbar: Navbar,
  auth: Auth,
  dash: Dashboard,
  tip: TipModal,
  form: Form
})

const injObser = (...stores) => com => inject(...stores)(observer(com))
const uiObserver = injObser('ui')

export { injObser, uiObserver }
export default UiStore
