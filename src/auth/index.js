import React from 'react'
import Rodal from 'rodal'
import styled from 'styled-components'

import SignIn from './SignIn'
import SignUp from './SignUp'

import { uiObserver } from '../uiStore'
import 'rodal/lib/rodal.css'

const StylRodal = styled(Rodal)`
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
  <StylRodal
    animation='fade'
    visible={ui.authModalVisible}
    onClose={ui.hideAuthModal}
  >
    {ui.authPageSignUp
      ? <SignUp onLog={ui.gotoLog} />
      : <SignIn onReg={ui.gotoReg} />}
  </StylRodal>
)
export default uiObserver(Auth)
