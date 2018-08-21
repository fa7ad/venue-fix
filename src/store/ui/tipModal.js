import { types } from 'mobx-state-tree'

const { model, optional, boolean } = types

const TipModal = function (Tip) {
  return model('TipModal', {
    activeTip: Tip,
    visible: optional(boolean, false)
  }).actions(self => ({
    show () {
      self.visible = true
    },
    hide () {
      self.visible = false
    },
    activate (tip) {
      self.activeTip.set(tip)
    }
  }))
}
export default TipModal
