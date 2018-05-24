import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import { Button, Form, Input, Row } from 'reactstrap'

import 'flatpickr/dist/themes/material_blue.css'
import './SearchForm.css'

class SearchForm extends Component {
  state = {
    date: new Date()
  }

  render () {
    return (
      <Form className='form__root container'>
        <Row>
          <Input
            name='location'
            type='select'
            placeholder='City'
            className='col-sm-2'
          >
            <option>Dhaka</option>
            <option>Comilla</option>
            <option>Chittagong</option>
          </Input>
          <Input
            name='event'
            type='select'
            placeholder='Type Of Event'
            className='col-sm-2'
          >
            <option>Wedding</option>
            <option>Conference</option>
            <option>Meating</option>
          </Input>
          <Flatpickr
            value={this.state.date}
            onChange={date => {
              this.setState({ date })
            }}
            className='col-sm-3'
          />
          <Input name='guests' placeholder='Guests' className='col-sm-2' />
          <Button color='primary' className='form__button col-sm-3'>
            Search
          </Button>
        </Row>
      </Form>
    )
  }
}
export default SearchForm
