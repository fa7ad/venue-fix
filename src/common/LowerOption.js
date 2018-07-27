import React from 'react'
import PropTypes from 'prop-types'

const Option = ({ children }) => (
  <option value={children.toLowerCase()}>{children}</option>
)
Option.propTypes = {
  children: PropTypes.string.isRequired
}

export default Option
