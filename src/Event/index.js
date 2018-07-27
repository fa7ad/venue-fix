import React from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'
import qs from 'qs'
import cx from 'classnames'
import styled from 'styled-components'

import { Row, Container } from 'reactstrap'

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

const Event = ({ ui, location, ...p }) => (
  <Root>
    <EventForm initialData={qs.parse(location.search.slice(1) || '')} />
    <Container>
      <Row>
        <VenueCard bgImg={image1} size='4'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta modi culpa vero?
        </VenueCard>
        <VenueCard bgImg={image2} size='4'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere placeat dolorum beatae.
        </VenueCard>
        <VenueCard bgImg={image3} size='4'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe officia debitis corporis.
        </VenueCard>
        <VenueCard bgImg={image1} size='4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum voluptate aliquid voluptatem!
        </VenueCard>
        <VenueCard bgImg={image2} size='4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga ea soluta!
        </VenueCard>
        <VenueCard bgImg={image1} size='4'>
          hello
        </VenueCard>
        <VenueCard bgImg={image3} size='4'>
          hello
        </VenueCard>
        <VenueCard bgImg={image2} size='4'>
          hello
        </VenueCard>
        <VenueCard bgImg={image3} size='4'>
          hello
        </VenueCard>

      </Row>
    </Container>
    <Footer />
  </Root>
)

Event.propTypes = {
  ui: PropTypes.object.isRequired,
  location: PropTypes.object
}

export default inject('ui')(Event)
