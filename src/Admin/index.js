import React from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'
import { Home, File, PlusCircle } from 'react-feather'
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem as NavItm
} from 'reactstrap'

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

const NavItem = styled(NavItm).attrs({
  className: p =>
    cx(
      { 'text-dark': !p.active },
      { 'text-light': p.active },
      'btn',
      p.className
    )
})`
  display: inline-flex;
  align-items: center;
  padding: 1em .5em;
  width: calc(100% + 1em);
  svg {
    margin-right: 1em;
  }

  &.active {
    background-color: #333;
  }
`

export default p => (
  <FluidRoot>
    <Row>
      <Nav className='col-sm bg-light text-dark' vertical>
        <NavItem tag={defaultProps({ to: '/' })(Link)}>
          <Home />
          Home
        </NavItem>
        <NavItem active tag={defaultProps({ to: '/admin/' })(Link)}>
          <Home />
          Dashboard
        </NavItem>
        <NavItem tag={defaultProps({ to: '/admin/bookings' })(Link)}>
          <File />
          Bookings
        </NavItem>
        <NavItem tag={defaultProps({ to: '/admin/tips/new' })(Link)}>
          <PlusCircle />
          Add Tips
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
