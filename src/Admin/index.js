import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import ManageTips from './Tips'
import Bookings from './Bookings'

import { injObser } from '../uiStore'
import { lifecycle } from 'recompose'

const FluidRoot = styled.div`
  flex-grow: 1;
  flex-basis: 100%;

  display: flex;
  flex-direction: row;
`

const TempDash = p => (
  <div>
    <h2 className='d-flex border-bottom py-2'>Dashboard</h2>
  </div>
)

const AdminPage = ({ ui: { dash } }) => (
  <FluidRoot>
    <Sidebar active={dash.activePage} />
    <Col md='10'>
      <Switch>
        <Route
          path='/admin/'
          exact
          component={injObser('ui')(
            lifecycle({
              componentDidMount () {
                this.props.ui.dash.activate('dashboard')
              }
            })(TempDash)
          )}
        />
        <Route path='/admin/tips' component={ManageTips} />
        <Route path='/admin/bookings' component={Bookings} />
      </Switch>
    </Col>
  </FluidRoot>
)

AdminPage.propTypes = {
  ui: PropTypes.object
}

export default injObser('ui')(AdminPage)
