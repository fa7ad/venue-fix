import React from 'react'
import styled from 'styled-components'
import { Card, Button, CardTitle, Col } from 'reactstrap'

const StyCard = styled(Card)`
  min-height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: ${p => `linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5)),` +
    `url(${p['data-bgimg']})`};

  &:hover {
    background-image: ${p => `linear-gradient(rgba(20,20,20, .75), rgba(20,20,20, .75)),` +
      `url(${p['data-bgimg']})`};
  }
`

const NormalCard = ({ size, children, btn, onActivate, caption, bgImg, ...p }) => (
  <Col sm={size || 3} {...p}>
    <StyCard body inverse data-bgimg={bgImg}>
      <CardTitle>{children}</CardTitle>
      <Button color={btn || 'primary'} onClick={onActivate}>{caption}</Button>
    </StyCard>
  </Col>
)

const PictureCard = styled(NormalCard)`
padding-left: 10px;
padding-right: 10px;
padding: 20px 10px;

width: 100%;
background-color: transparent;
`

export default PictureCard
