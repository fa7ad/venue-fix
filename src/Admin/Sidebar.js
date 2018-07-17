import React from 'react'
import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'

import cx from 'classnames'
import styled from 'styled-components'
import { Home, File, PlusCircle } from 'react-feather'

import { Nav, NavItem as NavItm } from 'reactstrap'

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

const Sidebar = p => (
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
)
export default Sidebar
