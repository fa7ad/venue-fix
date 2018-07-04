import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem as NItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import styled from 'styled-components'

import { uiObserver } from '../uiStore'
import { Link } from 'react-router-dom'

import logoImg from '../images/logo.svg'
import './Navigation.css'

const category = [
  'Community/Party center',
  'Conventun Hall',
  'Catering Service'
]
const us = ['Contact Us', 'About Us']

const NavItem = ({ to, children, onClick, ...p }) => (
  <NItem {...p} onClick={p.ui.navbar.toggle}>
    {to && <NavLink tag={pr => <Link to={to} {...pr}>{children}</Link>} />}
    {onClick && <NavLink onClick={onClick}>{children}</NavLink>}
  </NItem>
)
NavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func
}

const StyNavItem = styled(uiObserver(NavItem))`
  &, &:hover, &:link {
    cursor: pointer;
  }
`

const StyBrand = styled(NavbarBrand)`
  &, &:hover, &:link {
    cursor: pointer;
  }
`

const Navigation = ({ ui, page, ...p }) => (
  <Navbar
    fixed='top'
    color={ui.navbar.color(page)}
    dark
    expand='md'
    className={cx('nav__root')}
  >
    <Container>
      <StyBrand onClick={e => p.history.push('/')}>
        <img src={logoImg} alt='nothing' className='nav__image' /> Venue-Fix
      </StyBrand>
      <NavbarToggler onClick={ui.navbar.toggle} />
      <Collapse isOpen={ui.navbar.isOpen} navbar>
        <Nav className={cx('nav-container', 'ml-auto')} navbar>
          <StyNavItem to='/'>Home</StyNavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Category
            </DropdownToggle>
            <DropdownMenu>
              {category.map((el, ind) => (
                <DropdownItem key={ind}>
                  {el}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <StyNavItem to='/tips'>Tips</StyNavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Us
            </DropdownToggle>
            <DropdownMenu>
              {us.map((el, ind) => (
                <DropdownItem key={ind}>
                  {el}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <StyNavItem onClick={ui.auth.showModal}>Login / Register</StyNavItem>
          <StyNavItem to='/event'>Create Event</StyNavItem>
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
)

Navigation.propTypes = {
  ui: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired
}

export default uiObserver(Navigation)
