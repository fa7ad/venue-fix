import React, { Component } from 'react'
import types from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class SignIn extends Component {
  render () {
    return (
      <Form>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type='phone'
            name='phone'
            id='phoneId'
            placeholder='Phone'
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePassword'>Password</Label>
          <Input
            type='password'
            name='password'
            id='PasswordId'
            placeholder='Password'
          />
        </FormGroup>
        <Button>Sign In</Button>
        <Button color='link' onClick={this.props.onReg}>Create an account</Button>
      </Form>
    )
  }

  static propTypes = {
    onReg: types.func
  }
}
export default SignIn
