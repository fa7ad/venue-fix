import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

class EventForm extends Component {
  render () {
    return (
      <Form>
        <FormGroup>
          <Label for='event'>Your Event</Label>
          <Input type='select' name='event' id='eventId' placeholder='City'>
            <option>Dhaka</option>
            <option>Comilla</option>
            <option>Chittagong</option>
          </Input>
          <Input
            type='email'
            name='email'
            id='exampleEmail'
            placeholder='with a placeholder'
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Email</Label>
          <Input
            type='email'
            name='email'
            id='exampleEmail'
            placeholder='with a placeholder'
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleEmail'>Email</Label>
          <Input
            type='email'
            name='email'
            id='exampleEmail'
            placeholder='with a placeholder'
          />
        </FormGroup>
      </Form>
    )
  }
}
export default EventForm
