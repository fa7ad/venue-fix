const Option = ({ children }) => (
  <option value={children.toLowerCase()}>{children}</option>
)
Option.propTypes = {
  children: PropTypes.string
}

export default Option
