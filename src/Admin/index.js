import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import ManageTips from './Tips'
import Bookings from './Bookings'

import { uiObserver } from '../uiStore'

const FluidRoot = styled.div`
  @media (min-width: 768px) {
    flex-grow: 1;
    flex-basis: 100%;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const TempDash = p => (
  <div>
    <h2 className='d-flex border-bottom py-2'>Dashboard</h2>
  </div>
)

const AdminPage = ({ ui: { dash } }) => (
  <FluidRoot>
    <Sidebar active={dash.activePage} />
    <Col md='10' className='px-0'>
      <Switch>
        <Route path='/admin/' exact component={uiObserver(TempDash)} />
        <Route path='/admin/tips' component={ManageTips} />
        <Route path='/admin/bookings' component={Bookings} />
      </Switch>
      <Switch>
        <Route
          render={p => {
            dash.activate(p.match.params.page || 'dashboard')
            return <div />
          }}
        />
      </Switch>
    </Col>
  </FluidRoot>
)

AdminPage.propTypes = {
  ui: PropTypes.object
}

export default uiObserver(AdminPage)
