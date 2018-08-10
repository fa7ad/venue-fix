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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import styled from 'styled-components'

import NavItem from './NavItem'

import { uiObserver } from '../uiStore'

import logoImg from '../images/logo.svg'
import './Navigation.css'

const category = [
  'Community/Party center',
  'Conventun Hall',
  'Catering Service'
]

const StyBrand = styled(NavbarBrand)`
  color: #fff;
  &, &:hover, &:link {
    cursor: pointer;
  }
`

const Logo = styled.img`
  max-height: 2em;
`

const NavigationBar = styled(Navbar).attrs({
  fixed: 'top',
  dark: true,
  expand: 'md',
  className: p => cx(p.className, 'px-0 py-2')
})`
  transition: background-color 500ms ease;
`

const StyNav = styled(Nav)`
@media (max-width: 768px) {
  & > * {
    padding: 0 5px;
    background: rgba(0, 0, 0, 0.5);
  }
}
`

const Navigation = ({ ui, page, history, ...p }) => (
  <NavigationBar color={ui.navbar.color}>
    <Container className='p-0'>
      <StyBrand onClick={e => history.push('/')}>
        <Logo src={logoImg} alt='Logo' /> Venue-Fix
      </StyBrand>
      <NavbarToggler onClick={ui.navbar.toggle} />
      <Collapse isOpen={ui.navbar.isOpen} navbar>
        <StyNav className={cx('nav-container', 'ml-auto')} navbar>
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
              <DropdownItem onClick={e => history.push('/about-us')}>
                About Us
              </DropdownItem>
              <DropdownItem onClick={e => history.push('/contact-us')}>
                Contact Us
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem onClick={ui.auth.showModal}>Login / Register</NavItem>
          <NavItem to='/event' button='danger'>Create Event</NavItem>
        </StyNav>
      </Collapse>
    </Container>
  </NavigationBar>
)

Navigation.propTypes = {
  ui: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

export default uiObserver(Navigation)
