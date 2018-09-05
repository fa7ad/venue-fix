import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import req from '../request'

class Register extends React.Component {
  state = {
    name: '',
    phone: '',
    address: '',
    password: ''
  }

  render () {
    return (
      <Form method='PUT' action='#'>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            required
            value={this.state.name}
            onChange={this.valChange('name')}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type='phone'
            name='phone'
            id='phone'
            placeholder='Phone'
            required
            value={this.state.phone}
            onChange={this.valChange('phone')}
            pattern='^[0-9]{11}$'
          />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
            value={this.state.address}
            onChange={this.valChange('address')}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            required
            value={this.state.password}
            onChange={this.valChange('password')}
          />
        </FormGroup>
        <Button onClick={this.createUser}>Register</Button>
        <Button color='link' onClick={this.props.onLog}>
          Login to existing account
        </Button>
      </Form>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })

  createUser = e => {
    e.preventDefault()
    req
      .url('/auth')
      .json(this.state)
      .put()
      .error(409, e =>
        this.setState({
          name: '',
          phone: '',
          address: '',
          password: ''
        })
      )
      .json(e => {
        console.log(e)
        this.props.onLog()
      })
  }

  static propTypes = {
    onLog: PropTypes.func
  }
}

export default Register
