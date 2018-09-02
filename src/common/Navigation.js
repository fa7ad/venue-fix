import cx from 'classnames'
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

import NavItem from './NavItem'
import { inObser } from '../store/utils'
import req from '../request'

import logo from './logo.svg'

const category = [
  'Community/Party center',
  'Conventun Hall',
  'Catering Service'
]

const StyBrand = styled(NavbarBrand)`
  &, &:hover, &:link {
    &&& {
      color: #fff;
    }
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
  .nav-item a.nav-link {
    color: #fff !important;
  }
`
class Navigation extends React.Component {
  goTo = url => e => this.props.history.push(url)

  render () {
    const { ui } = this.props
    return (
      <NavigationBar color={ui.navbar.color}>
        <Container className='p-0'>
          <StyBrand onClick={this.goTo('/')}>
            <Logo src={logo} /> Venue-Fix
          </StyBrand>
          <NavbarToggler onClick={ui.navbar.toggle} />
          <Collapse isOpen={ui.navbar.isOpen} navbar>
            <StyNav className='nav-container ml-auto' navbar>
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
                  <DropdownItem onClick={this.goTo('/about-us')}>
                    About Us
                  </DropdownItem>
                  <DropdownItem onClick={this.goTo('/contact-us')}>
                    Contact Us
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem
                onClick={ui.navbar.loggedIn ? this.logOut : ui.auth.showModal}
                children={ui.navbar.loggedIn ? 'Log out' : 'Login / Register'}
              />
              {ui.navbar.isAdmin &&
                <NavItem to='/admin' button='primary' className='mr-2'>
                  Dashboard
                </NavItem>}
              <NavItem to='/event' button='danger'>Create Event</NavItem>
            </StyNav>
          </Collapse>
        </Container>
      </NavigationBar>
    )
  }

  logOut = e => {
    req
      .url('/logout')
      .get()
      .json(({ to }) => this.props.history.push(to))
      .then(e => {
        this.props.ui.navbar.logOut()
      })
  }

  componentDidMount () {
    const { navbar } = this.props.ui
    req
      .url('/loggedIn')
      .get()
      .unauthorized(e => navbar.authState(false))
      .json(r => navbar.authState(r.success, r.admin))
  }

  static propTypes = {
    ui: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
}

export default inObser(['ui'], Navigation)
