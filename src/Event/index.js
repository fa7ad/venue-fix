import React from 'react'
import { inject } from 'mobx-react'
import cx from 'classnames'
import styled from 'styled-components'

import EventForm from './EventForm'
import VenueCard from './Venues'
import Footer from '../common/Footer'

import image1 from '../images/hotel.jpg'
import image2 from '../images/hotel2.jpg'
import image3 from '../images/hotel3.jpg'

const Root = styled.div.attrs({
  className: p => cx('root', p.className)
})`
  margin-top: 64px;
`

const Event = ({ ui, ...p }) => (
  <Root>
    <EventForm />
    <VenueCard bgImg={image1} size='4'>
      hello
    </VenueCard>
    <VenueCard bgImg={image2} size='4'>
      hello
    </VenueCard>
    <VenueCard bgImg={image3} size='4'>
      hello
    </VenueCard>
    <Footer />
  </Root>
)

export default inject('ui')(Event)
