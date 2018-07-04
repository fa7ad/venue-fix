import React from 'react'
import types from 'prop-types'
import styled from 'styled-components'
import { Card, CardTitle, CardImg, Col } from 'reactstrap'

const CardStyle = styled(Card)`
  img {
    min-height: 250px;
  }
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const Venues = ({ children, bgImg, size, ...p }) => (
  <Col sm={size || 3} {...p}>
    <CardStyle>
      <CardImg top width='100%' src={bgImg} />
      <CardTitle>{children}</CardTitle>
    </CardStyle>
  </Col>
)

Venues.propTypes = {
  children: types.oneOf(types.string, types.element),
  bgImg: types.string,
  size: types.oneOf(types.string, types.number)
}

const VenueCard = styled(Venues)`
padding-left: 10px;
padding-right: 10px;
padding: 20px 10px;

width: 100%;
background-color: transparent;
`
export default VenueCard
