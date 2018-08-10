import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import ManageTips from './Tips'
import Bookings from './Bookings'
import Profile from './Profile'

import { uiObserver } from '../uiStore'
import { lifecycle } from 'recompose'

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
        <Route path='/admin/tips'>
          <ManageTips />
        </Route>
        <Route path='/admin/bookings'>
          <Bookings />
        </Route>
        <Route path='/admin/profile'><Profile /></Route>
      </Switch>
      <Switch>
        <Route
          component={lifecycle({
            componentDidMount () {
              const { page } = this.props.match.params
              if (dash.activePage !== page) dash.activate(page)
            }
          })(p => <div data-what='navigation' />)}
        />
      </Switch>
    </Col>
  </FluidRoot>
)

AdminPage.propTypes = {
  ui: PropTypes.object
}

export default uiObserver(AdminPage)
