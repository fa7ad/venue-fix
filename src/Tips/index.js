import React from 'react'
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

  margin-top: 60px;
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

const TipCard = styled(Tip)`
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 1rem;
  }
`

// sample data
const tips = [
  {
    heading: 'Hello World',
    time: new Date(),
    body: `
    # hello world
    ## hi, mars
    ### bye, pluto
  `
  },
  {
    heading: 'Hello React',
    time: new Date(),
    body: `
    # hello react
    ## hi, vue
    ### bye, angular
  `
  }
]

const TipsPage = p => (
  <Root>
    <Container>
      {tips.map((d, i) => <TipCard key={i} tip={d} />)}
    </Container>
    <Footer />
  </Root>
)

export default TipsPage
