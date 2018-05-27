import React from 'react'
import t from 'prop-types'
import cx from 'classnames'
import styled from 'styled-components'
import { Card, Button, CardTitle, Col } from 'reactstrap'

import { card, wrapper } from './PictureCard.module.css'

const NormalCard = p => (
  <Col sm={p.size || 3} className={wrapper}>
    <Card body inverse className={cx(p.className, card)}>
      <CardTitle>{p.children}</CardTitle>
      <Button color={p.btn || 'primary'}>{p.caption}</Button>
    </Card>
  </Col>
)

NormalCard.propTypes = {
  size: t.string,
  bgImg: t.string.isRequired,
  children: t.string,
  caption: t.string.isRequired,
  btn: t.string
}

const PictureCard = styled(NormalCard)`
width: 100%;
background-color: transparent;
background-image: ${p => `linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5)), url(${p.bgImg})`};

&:hover {
  background-image: ${p => `linear-gradient(rgba(20,20,20, .75), rgba(20,20,20, .75)), url(${p.bgImg})`};
}
`

export default PictureCard
