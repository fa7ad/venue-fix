import React, { Component } from 'react'
import cx from 'classnames'
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

import { Link } from 'react-router-dom'
import logoImg from '../images/logo.svg'

import './Navigation.css'

const category = [
  'Community/Party center',
  'Conventun Hall',
  'Catering Service'
]
const us = ['Contact Us', 'About Us']

const NavItem = ({ to, children, ...p }) => (
  <NItem className='nav-item-vf' {...p}>
    <NavLink tag={pr => <Link to={to} {...pr}>{children}</Link>} />
  </NItem>
)

class Navigation extends Component {
  state = {
    isOpen: false
  }

  toggle = e => {
    this.setState(p => ({ isOpen: !p.isOpen }))
  }

  render () {
    return (
      <Navbar
        fixed='top'
        color={this.props.color}
        dark
        expand='md'
        className='nav__root'
      >
        <Container>
          <NavbarBrand>
            <img src={logoImg} alt='nothing' className='nav__image' /> Venue-Fix
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
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
              <NavItem to='/auth'>Login / Register</NavItem>
              <NavItem to='/event'>Create Event</NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Navigation
