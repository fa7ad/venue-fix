import { defaultProps } from 'recompose'
import { Link } from 'react-router-dom'

import cx from 'classnames'
import { Nav, NavItem as NavItm } from 'reactstrap'

import { FaChartLine } from 'react-icons/fa'
import { FiHome, FiList, FiInfo, FiUser } from 'react-icons/fi'

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
    width: 1.5em;
    height: 1.5em;
  }

  &.active {
    background-color: #32383e;
  }
`

const itemsList = [
  {
    href: '/',
    caption: 'Home',
    key: 'home',
    icon: <FiHome />
  },
  {
    href: '/admin/profile',
    caption: 'Profile',
    key: 'profile',
    icon: <FiUser />
  },
  {
    href: '/admin/',
    caption: 'Dashboard',
    key: 'dashboard',
    icon: <FaChartLine />
  },
  {
    href: '/admin/bookings',
    caption: 'Bookings',
    key: 'bookings',
    icon: <FiList />
  },
  {
    href: '/admin/tips',
    caption: 'Tips',
    key: 'tips',
    icon: <FiInfo />
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
