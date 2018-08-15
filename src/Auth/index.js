import Rodal from 'rodal'

import Login from './Login'
import Register from './Register'

import { uiObserver } from '../uiStore'

const StyRodal = styled(Rodal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .rodal-dialog {
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    height: auto !important;
  }
`

const Auth = ({ ui, ...p }) => (
  <StyRodal
    animation='fade'
    visible={ui.auth.modal}
    onClose={ui.auth.hideModal}
  >
    {ui.auth.register
      ? <Register onLog={ui.auth.toLog} history={p.history} />
      : <Login onReg={ui.auth.toReg} />}
  </StyRodal>
)

Auth.propTypes = {
  ui: PropTypes.object.isRequired
}

export default uiObserver(Auth)
