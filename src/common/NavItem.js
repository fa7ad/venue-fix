import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'

import { Link } from 'react-router-dom'
import { defaultProps } from 'recompose'
import { NavItem as NItem, NavLink } from 'reactstrap'

const Item = ({ to, children, onClick, className, button, ...p }) => (
  <NItem className={cx(className, button && 'btn-' + button)} {...p}>
    {to && <NavLink tag={defaultProps({ to })(Link)} children={children} />}
    {onClick && <NavLink {...{ onClick, children }} />}
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
a, a:link {
  color: #fff;
}
`

export default NavItem
