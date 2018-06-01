import React from 'react'
import Rodal from 'rodal'
import styled from 'styled-components'

import SignIn from './SignIn'
import SignUp from './SignUp'

import { uiObserver } from '../uiStore'
import 'rodal/lib/rodal.css'

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
    {ui.auth.signup
      ? <SignUp onLog={ui.auth.toLog} />
      : <SignIn onReg={ui.auth.toReg} />}
  </StyRodal>
)
export default uiObserver(Auth)
