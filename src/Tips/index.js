import React from 'react'
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

const Tip = p => (
  <Card>
    
  </Card>
)

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
      f
    </Container>
    <Footer />
  </Root>
)

export default TipsPage
