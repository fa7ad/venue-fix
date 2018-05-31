import React from 'react'
import Rodal from 'rodal'

import SignIn from './SignIn'
import SignUp from './SignUp'

import { uiObserver } from '../uiStore'
import 'rodal/lib/rodal.css'

const Auth = ({ ui, ...p }) => (
  <Rodal
    animation='fade'
    visible={ui.authModalVisible}
    onClose={ui.hideAuthModal}
    height={ui.authModalHeight}
  >
    {ui.authPageSignUp
      ? <SignUp onLog={ui.gotoLog} />
      : <SignIn onReg={ui.gotoReg} />}
  </Rodal>
)
export default uiObserver(Auth)
