import React from 'react'

import E404 from '../images/404.jpg'

import './404.css'

const FourOhFour = p => (
  <div className='root'>
    <h1>404!</h1>
    <img src={E404} alt='404 Not Found!' onClick={e => p.history.push('/')} />
  </div>
)

export default FourOhFour
