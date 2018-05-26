import { decorate, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

class UiStore {
  navColor = 'transparent'

  setNavColor = color => () => {
    console.log(color)
    this.navColor = color
  }

  setOpaqueNav = this.setNavColor('dark')
  setTranspNav = this.setNavColor('transparent')
}

const injObser = store => com => inject(store)(observer(com))

export { injObser }
export default decorate(UiStore, {
  navColor: observable
})
