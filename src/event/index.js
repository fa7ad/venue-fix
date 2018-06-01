import React from 'react'
import { inject } from 'mobx-react'
import cx from 'classnames'
import styled from 'styled-components'
import ScrollTrigger from 'react-scroll-trigger'

import EventForm from './EventForm'
import Venues from './Venues'

const Root = styled.div.attrs({
  className: p => cx('root', p.className)
})`
  margin-top: 64px;
`

const Event = ({ ui, ...p }) => (
  <ScrollTrigger onEnter={ui.navbar.toDark}>
    <Root>
      <EventForm />
      <Venues />
    </Root>
  </ScrollTrigger>
)

export default inject('ui')(Event)
