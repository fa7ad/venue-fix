import React from 'react'
import { inject } from 'mobx-react'
import cx from 'classnames'
import styled from 'styled-components'

import EventForm from './EventForm'
import Venues from './Venues'

const Root = styled.div.attrs({
  className: p => cx('root', p.className)
})`
  margin-top: 64px;
`

const Event = ({ ui, ...p }) => (
  <Root>
    <EventForm />
    <Venues />
  </Root>
)

export default inject('ui')(Event)