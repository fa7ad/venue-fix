import React from 'react'
import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'

import cx from 'classnames'
import styled from 'styled-components'
import { Home, PlusCircle, List, Activity, Info } from 'react-feather'

import { Nav, NavItem as NavItm } from 'reactstrap'
import PropTypes from 'prop-types'

import { injObser } from '../uiStore'

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

const itemsList = [
  {
    href: '/',
    caption: 'Home',
    key: 'home',
    icon: <Home />
  },

  {
    href: '/admin/',
    caption: 'Dashboard',
    key: 'dashboard',
    icon: <Activity />
  },
  {
    href: '/admin/bookings',
    caption: 'Bookings',
    key: 'bookings',
    icon: <List />
  },
  {
    href: '/tips/',
    caption: 'Tips',
    key: 'tips',
    icon: <Info />
  },
  {
    href: '/admin/tips/new',
    caption: 'Add Tips',
    key: 'add-tips',
    icon: <PlusCircle />
  }
]

const Sidebar = ({ ui: { dash }, active }) => (
  <Nav className='col-sm bg-light text-dark' vertical>
    {itemsList.map(it => (
      <NavItem
        key={it.key}
        active={it.key === active}
        tag={defaultProps({ to: it.href })(Link)}
        onClick={e => {
          dash.activate(it.key)
        }}
      >
        {it.icon}
        {it.caption}
      </NavItem>
    ))}
  </Nav>
)

Sidebar.propTypes = {
  ui: PropTypes.object,
  active: PropTypes.string
}

export default injObser('ui')(Sidebar)
