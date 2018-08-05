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

const Item = ({ to, children, onClick, className, button, ...p }) => (
  <NItem className={cx(className, button ? 'btn-' + button : '')} {...p}>
    {to && <NavLink tag={pr => <Link to={to} {...pr}>{children}</Link>} />}
    {onClick && <NavLink onClick={onClick}>{children}</NavLink>}
  </NItem>
)

Item.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  button: PropTypes.string
}

const NavItem = styled(Item)`
&, &:hover, &:link {
  cursor: pointer;
}
`

const StyBrand = styled(NavbarBrand)`
  &, &:hover, &:link {
    cursor: pointer;
  }
`

const Logo = styled.img`
  max-height: 2em;
`

const Navigation = ({ ui, page, history, ...p }) => (
  <Navbar
    fixed='top'
    color={ui.navbar.color}
    dark
    expand='md'
    className={cx('nav__root')}
  >
    <Container>
      <StyBrand onClick={e => history.push('/')}>
        <Logo src={logoImg} alt='nothing' className='nav__image' /> Venue-Fix
      </StyBrand>
      <NavbarToggler onClick={ui.navbar.toggle} />
      <Collapse isOpen={ui.navbar.isOpen} navbar>
        <Nav className={cx('nav-container', 'ml-auto')} navbar>
          <NavItem to='/'>Home</NavItem>
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
          <NavItem to='/tips'>Tips</NavItem>
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
          <NavItem onClick={ui.auth.showModal}>Login / Register</NavItem>
          <NavItem to='/event' button='danger'>Create Event</NavItem>
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
)

Navigation.propTypes = {
  ui: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

export default uiObserver(Navigation)
