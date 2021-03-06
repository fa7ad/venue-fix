import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Login extends React.Component {
  render () {
    return (
      <Form method='POST' action='/auth'>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            name='phone'
            id='phone'
            placeholder='Phone'
            required
            pattern='^01[0-9]{9}$'
            title='Enter a valid 11-digit phone number'
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
          />
        </FormGroup>
        <Button>Login</Button>
        <Button color='link' onClick={this.props.onReg}>
          Create an account
        </Button>
      </Form>
    )
  }

  static propTypes = {
    onReg: PropTypes.func
  }
}
export default Login
