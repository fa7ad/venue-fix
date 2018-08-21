import { types } from 'mobx-state-tree'

import Auth from './auth'
import Navbar from './navbar'
import TipModal from './tipModal'
import Dashboard from './dash/'

const { model, late } = types

const UI = function (data) {
  model('UI', {
    navbar: Navbar,
    auth: Auth,
    dash: Dashboard,
    tip: late('TipModal', () => TipModal(data.Tip)),
    form: late('Form', () => data.Form)
  })
}

export default UI
