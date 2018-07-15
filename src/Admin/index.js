import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'

import Sidebar from './Sidebar'

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
            <h2 className='d-flex border-bottom py-2'>Dashboard</h2>
          </div>
        </Route>
      </Switch>
    </Col>
  </FluidRoot>
)
