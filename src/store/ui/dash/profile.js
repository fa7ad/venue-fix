import { types } from 'mobx-state-tree'

const { model, optional, boolean } = types

const Profile = model('UserProfile', {
  formSuccess: optional(boolean, false)
}).actions(self => ({
  hideSuccess () {
    self.formSuccess = false
  },
  showSuccess () {
    self.formSuccess = true
  },
  toggleSuccess () {
    self.formSuccess = !self.formSuccess
  }
}))

export default Profile
