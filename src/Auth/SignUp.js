import React, { Component } from 'react'
import types from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class SignUp extends Component {
  render () {
    return (
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input type='text' name='name' id='nameId' placeholder='Name' />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input type='phone' name='phone' id='phoneId' placeholder='Phone' />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type='text'
            name='address'
            id='addressId'
            placeholder='Address'
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
        <Button>Sign Up</Button>
        <Button color='link' onClick={this.props.onLog}>
          Login to existing account
        </Button>
      </Form>
    )
  }

  static propTypes = {
    onLog: types.func
  }
}

export default SignUp
