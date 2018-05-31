import React from 'react'
import styled from 'styled-components'

import E404 from '../images/404.jpg'

const FourOhFour = p => (
  <div>
    <h1>404!</h1>
    <img src={E404} alt='404 Not Found!' onClick={e => p.history.push('/')} />
  </div>
)

export default styled(FourOhFour)`
flex-basis: 100%;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
