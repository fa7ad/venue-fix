import { types } from 'mobx-state-tree'

import Profile from './profile'

const { model, optional, string } = types

const Dashboard = model('Dashboard', {
  activePage: optional(string, 'dashboard'),
  profile: Profile
}).actions(self => ({
  activate (page = 'dashboard') {
    self.activePage = page
  }
}))

export default Dashboard
