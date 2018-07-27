import cx from 'classnames'
import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import { Button, Form, Input, Container } from 'reactstrap'

import 'flatpickr/dist/themes/material_blue.css'
import css from './SearchSection.module.css'

class SearchSection extends Component {
  state = {
    date: new Date()
  }

  render () {
    return (
      <Container className={css.root}>
        <Form className={cx(css.jcsb, 'row')} action='/event'>
          <Input
            name='location'
            type='select'
            placeholder='City'
            className={cx('col-sm-2', css['col-sm-2'])}
          >
            <option>Dhaka</option>
            <option>Comilla</option>
            <option>Chittagong</option>
          </Input>
          <Input
            name='event'
            type='select'
            placeholder='Type Of Event'
            className={cx('col-sm-2', css['col-sm-2'])}
          >
            <option>Wedding</option>
            <option>Conference</option>
            <option>Meating</option>
          </Input>
          <Flatpickr
            data-enable-time
            value={this.state.date}
            onChange={date => {
              this.setState({ date })
            }}
            className={cx('col-sm-3', css['form-control'], 'form-control')}
          />
          <Input
            name='guests'
            placeholder='Guests'
            className={cx('col-sm-2', css['col-sm-2'])}
          />
          <Button color='primary' className='form__button col-sm-2'>
            Search
          </Button>
        </Form>
      </Container>
    )
  }
}
export default SearchSection
