import React from 'react'
import styled from 'styled-components'
import { Card, CardTitle, Col, Container, Row } from 'reactstrap'

const CardStyle = styled(Card)`
  min-height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border: none;

  background-image: ${p => `linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5)),` + `url(${p['data-bgimg']})`};
`

const Venues = ({ children, bgImg, size, ...p }) => (
  <Container>
    <Row>
      <Col sm={size || 3} {...p}>
        <CardStyle body inverse data-bgimg={bgImg} />
        <CardTitle>{children}</CardTitle>
      </Col>
    </Row>
  </Container>
)

const VenueCard = styled(Venues)`
padding-left: 10px;
padding-right: 10px;
padding: 20px 10px;

width: 100%;
background-color: transparent;
`
export default VenueCard
