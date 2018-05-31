import { decorate, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

class UiStore {
  // Navbar Background color
  navColor = 'transparent'

  setNavColor = color => () => {
    this.navColor = color
  }
  setOpaqueNav = this.setNavColor('dark')
  setTranspNav = this.setNavColor('transparent')

  // Navbar collaps
  navIsOpen = false
  toggleNav = e => {
    this.navIsOpen = !this.navIsOpen
  }

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
}

const injObser = store => com => inject(store)(observer(com))
const uiObserver = injObser('ui')

export { injObser, uiObserver }
export default decorate(UiStore, {
  navColor: observable,
  navIsOpen: observable,
  authModalVisible: observable,
  authPageSignUp: observable
})
