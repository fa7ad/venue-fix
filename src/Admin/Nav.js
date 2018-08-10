import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavLink, NavItem, Nav } from 'reactstrap'

import req from '../request'

const AdminNav = ({ history, ...p }) => (
  <Navbar color='dark' dark className='flex-md-nowrap py-2 px-0'>
    <NavbarBrand
      className='col-sm-3 col-md-2 mr-0'
      tag={defaultProps({ to: '/' })(Link)}
    >
      venue-fix
    </NavbarBrand>
    <div className='w-100' />
    <Nav navbar className='text-nowrap px-3'>
      <NavItem>
        <NavLink
          onClick={e => {
            e.preventDefault()
            req.url('/signout').get().json(({ to }) => history.push(to))
          }}
          href='#'
        >
          Sign out
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
)

AdminNav.propTypes = {
  history: PropTypes.object
}

export default AdminNav
