import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import req from '../request'

class SignUp extends Component {
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
            onChange={this.valChange('phone')}
          />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
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
            onChange={this.valChange('password')}
          />
        </FormGroup>
        <Button onClick={this.createUser}>Sign Up</Button>
        <Button color='link' onClick={this.props.onLog}>
          Login to existing account
        </Button>
      </Form>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })

  createUser = e => {
    e.preventDefault()
    req.api('/auth').json(this.state).put().json(e => {
      if (e.success) this.props.history.push('/?auth=signin')
      console.log(e)
    })
  }

  static propTypes = {
    onLog: PropTypes.func,
    history: PropTypes.object
  }
}

export default SignUp
