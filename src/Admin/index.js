import React from 'react'
import styled from 'styled-components'
import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'
import { Home, File, PlusCircle } from 'react-feather'
import { Container, Col, Row, Nav, NavItem as NavItm, NavLink } from 'reactstrap'

import chart from '../images/chart.png'

const FluidRoot = styled(Container).attrs({
  fluid: p => true
})`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;

  & > .row {
    flex-basis: 100%;
  }
`

const NavItem = styled(NavItm)`
  display: inline-flex;
  align-items: center;
  padding: 7px 0;
  a, a:link, a:hover {
    color: #111;
  }
  svg {
    margin: 0 5px;
  }
`

export default p => (
  <FluidRoot>
    <Row>
      <Nav className='col-sm bg-light text-dark' vertical>
        <NavItem>
          <Home />
          <NavLink tag={defaultProps({ to: '/' })(Link)}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <File />
          <NavLink tag={defaultProps({ to: '/admin/bookings' })(Link)}>
            Bookings
          </NavLink>
        </NavItem>
        <NavItem>
          <PlusCircle />
          <NavLink tag={defaultProps({ to: '/admin/tips/new' })(Link)}>
            Add Tips
          </NavLink>
        </NavItem>
      </Nav>
      <Col md='10'>
        <div className='d-flex border-bottom py-2'>
          <h2>Dashboard</h2>
        </div>
        <img className='my-4 w-100' src={chart} />
      </Col>
    </Row>
  </FluidRoot>
)
