import { decorate, observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'

class UiStore {
  // Navbar Background color
  navColor = 'transparent'

  setNavColor = color => () => {
    this.navColor = color
  }
  setOpaqueNav = this.setNavColor('dark')
  setTranspNav = this.setNavColor('transparent')

  // Authentication Modal
  authModalVisible = false
  showAuthModal = e => {
    this.authModalVisible = true
  }
  hideAuthModal = e => {
    this.authModalVisible = false
  }

  // Auth page
  authPageSignUp = false
  gotoPage = page => () => {
    this.authPageSignUp = page === 'signup'
  }
  gotoReg = this.gotoPage('signup')
  gotoLog = this.gotoPage('signin')

  get authModalHeight () {
    return this.authPageSignUp ? 350 : 200
  }
}

const injObser = store => com => inject(store)(observer(com))
const uiObserver = injObser('ui')

export { injObser, uiObserver }
export default decorate(UiStore, {
  navColor: observable,
  authModalVisible: observable,
  authPageSignUp: observable,
  authModalHeight: computed
})
