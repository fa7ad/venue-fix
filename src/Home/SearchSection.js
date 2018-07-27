import cx from 'classnames'
import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import { Button, Form, Input, Container } from 'reactstrap'
import { DateTime } from 'luxon'

import 'flatpickr/dist/themes/material_blue.css'
import css from './SearchSection.module.css'

import Option from '../common/LowerOption'

class SearchSection extends Component {
  state = {
    date: DateTime.local().plus({ day: 1 }).startOf('day').toJSDate()
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
            <Option>Dhaka</Option>
            <Option>Comilla</Option>
            <Option>Chittagong</Option>
          </Input>
          <Input
            name='event'
            type='select'
            placeholder='Type Of Event'
            className={cx('col-sm-2', css['col-sm-2'])}
          >
            <Option>Wedding</Option>
            <Option>Conference</Option>
            <Option>Meeting</Option>
          </Input>
          <Flatpickr
            data-enable-time
            value={this.state.date}
            onChange={([date]) => {
              this.setState({ date })
            }}
            className={cx('col-sm-3', css['form-control'], 'form-control')}
            options={{
              minuteIncrement: 30,
              dateFormat: 'Y.m.d h:i K',
              minDate: DateTime.local().endOf('day').toJSDate()
            }}
          />
          <input type='hidden' name='date' value={Number(this.state.date)} />
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
