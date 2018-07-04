import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import E404 from '../images/404.jpg'

const Root = styled.div`
flex-basis: 100%;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Img = styled.img`
cursor: pointer;
`

const FourOhFour = ({ history }) => (
  <Root>
    <h1>Error 404!</h1>
    <h3>The page you're looking for doesn't exist.</h3>
    <Img src={E404} alt='404 Not Found!' onClick={e => history.push('/')} />
  </Root>
)

FourOhFour.propTypes = {
  history: PropTypes.object.isRequired
}

export default FourOhFour
