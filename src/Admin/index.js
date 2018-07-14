import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'

import { Switch, Route } from 'react-router-dom'

import Sidebar from './Sidebar'
import chart from '../images/chart.png'

const FluidRoot = styled.div`
  flex-grow: 1;
  flex-basis: 100%;

  display: flex;
  flex-direction: row;
`

export default p => (
  <FluidRoot>
    <Sidebar />
    <Col md='10'>
      <Switch>
        <Route path='/admin/' exact>
          <div>
            <div className='d-flex border-bottom py-2'>
              <h2>Dashboard</h2>
            </div>
            <img className='my-4 w-100' src={chart} />
          </div>
        </Route>
      </Switch>
    </Col>
  </FluidRoot>
)
