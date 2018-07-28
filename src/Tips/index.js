import React from 'react'
import PropTypes from 'prop-types'
import mark from 'remove-markdown'
import styled from 'styled-components'

import {
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap'

import Footer from '../common/Footer'

const remark = function (md) {
  const text = mark(md)
  return text.split(' ').slice(0, 20).join(' ')
}

const Root = styled.div`
  background-color: #eee;

  margin-top: 4em;
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  .container {
    flex-grow: 1;
  }
`

const Tip = ({ tip, onModalActivate, ...p }) => (
  <Card className={p.className}>
    {tip.img && <CardImg top width='100%' src={tip.img} />}
    <CardBody>
      <CardTitle>{tip.heading || ''}</CardTitle>
      <CardSubtitle>{tip.time.toDateString() || ''}</CardSubtitle>
      <CardText className='text-muted'>
        {remark(tip.body)}
      </CardText>
      <Button onClick={onModalActivate}>See more</Button>
    </CardBody>
  </Card>
)

Tip.propTypes = {
  tip: PropTypes.object.isRequired,
  onModalActivate: PropTypes.func
}

const TipCard = styled(Tip)`
  margin: 8px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 1rem;
  }
`

const TipsPage = ({ tips }) => (
  <Root>
    <Container>
      {tips.map((d, i) => <TipCard key={i} tip={d} />)}
    </Container>
    <Footer />
  </Root>
)

TipsPage.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.object)
}

export default TipsPage
