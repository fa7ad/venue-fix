import React from 'react'
import Rodal from 'rodal'
import AuthMain from './AuthMain'
import { injObser } from '../uiStore'
import 'rodal/lib/rodal.css'

const Auth = props => (
  <Rodal
    animation='slideDown'
    visible={props.ui.visible}
    onClose={() => (props.ui.visible = false)}
  >
    <AuthMain />
  </Rodal>
)
export default injObser('ui')(Auth)
