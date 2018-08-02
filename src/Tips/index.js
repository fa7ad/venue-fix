import React, { Component } from 'react'
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

import { uiObserver } from '../uiStore'

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

const Tip = ({ tip, onActivate, ...p }) => (
  <Card className={p.className}>
    {tip.img && <CardImg top width='100%' src={tip.img} />}
    <CardBody>
      <CardTitle>{tip.heading || ''}</CardTitle>
      <CardSubtitle>{tip.time.toDateString() || ''}</CardSubtitle>
      <CardText className='text-muted'>
        {remark(tip.body)}
      </CardText>
      <Button onClick={e => onActivate(tip)}>See more</Button>
    </CardBody>
  </Card>
)

Tip.propTypes = {
  tip: PropTypes.object.isRequired,
  onActivate: PropTypes.func
}

const TipCard = styled(Tip)`
  margin: 8px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 1rem;
  }
`

class TipsPage extends Component {
  // sample data
  tips = [
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
      times: new Date(),
      body: `
      # hello react
      ## hi, vue
      ### bye, angular
    `
    }
  ]

  render () {
    return (
      <Root>
        <Container>
          {this.tips.map((data, idx) => (
            <TipCard key={idx} tip={data} onActivate={this.activateModal} />
          ))}
        </Container>
        <Footer />
      </Root>
    )
  }

  activateModal = tip => {
    const { ui } = this.props
    ui.tip.activate(tip)
    ui.tip.show()
  }

  static propTypes = {
    ui: PropTypes.object.isRequired
  }
}

export default uiObserver(TipsPage)
