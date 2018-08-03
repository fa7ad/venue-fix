import Slider from 'rc-slider'
import { DateTime } from 'luxon'
import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import {
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Container,
  Row,
  Col
} from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import 'rc-slider/assets/index.css'

import Option from '../common/LowerOption'

const StyContainer = styled(Container)`
  background-color: #fff;

  h3.text-primary {
    margin-top: 1em;
  }
`

const DatePicker = styled(Flatpickr)`
  &, &:read-only {
    background-color: #fff;
  }
`

const Range = Slider.createSliderWithTooltip(Slider.Range)

class EventForm extends Component {
  state = Object.assign(
    {
      date: DateTime.local().plus({ day: 1 }).startOf('day').toJSDate(),
      budget: [0, 50000],
      location: 'dhaka',
      guests: '0',
      event: 'conference',
      duration: 1,
      catering: false
    },
    this.props.initialData,
    this.props.initialData.date && {
      date: new Date(+this.props.initialData.date)
    }
  )

  valChange = name => e => {
    this.stateSet({ [name]: e.target.value })
  }

  stateSet = val =>
    this.setState(p => {
      this.props.onChange(Object.assign(p, val))
      return val
    })

  render () {
    const { valChange } = this
    return (
      <Form>
        <StyContainer>
          <h3 className='text-primary'>EVENT DETAILS</h3>
          <Row>
            <Col>
              <Label for='city'>Location</Label>
              <Input
                type='select'
                placeholder='City'
                id='location'
                value={this.state.location}
                onChange={valChange('location')}
              >
                <Option>Dhaka</Option>
                <Option>Comilla</Option>
                <Option>Chittagong</Option>
              </Input>
            </Col>
            <Col>
              <Label for='guests'>Guests</Label>
              <Input
                type='number'
                step='5'
                min='0'
                max='50000'
                id='guests'
                placeholder='Guest Count'
                value={this.state.guests}
                onChange={valChange('guests')}
              />
            </Col>
            <Col>
              <Label for='event'>Event Type</Label>
              <Input
                type='select'
                id='event'
                placeholder='Event'
                value={this.state.event}
                onChange={valChange('event')}
              >
                <Option>Conference</Option>
                <Option>Wedding</Option>
                <Option>Meeting</Option>
              </Input>
            </Col>
            <Col sm='4'>
              <Label for='date'>Date & Time</Label>
              <DatePicker
                data-enable-time
                id='date'
                value={this.state.date}
                onChange={([date]) => this.stateSet({ date })}
                className='form-control'
                options={{
                  minuteIncrement: 30,
                  dateFormat: 'Y.m.d h:i K',
                  minDate: DateTime.local().endOf('day').toJSDate()
                }}
              />
            </Col>
            <Col>
              <Label for='duration'>Duration</Label>
              <InputGroup>
                <Input
                  type='number'
                  min='1'
                  id='duration'
                  value={this.state.duration}
                  onChange={valChange('duration')}
                />
                <InputGroupAddon addonType='append'>
                  hr
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col
              sm='3'
              className='d-flex justify-content-center align-items-end'
            >
              <input
                type='checkbox'
                name='catering'
                id='catering'
                className='mb-2 position-static'
                checked={this.state.catering}
                onChange={e =>
                  this.stateSet({ catering: e.currentTarget.checked })}
              />
              <Label for='catering'>Catering</Label>
            </Col>
            <Col>
              <Label for='budget'>Budget</Label>
              <Range
                id='budget'
                min={0}
                max={200000}
                step={1000}
                value={this.state.budget}
                onChange={budget => this.stateSet({ budget })}
              />
            </Col>
          </Row>
        </StyContainer>
      </Form>
    )
  }
  componentDidMount () {
    this.stateSet({})
  }

  static propTypes = {
    initialData: PropTypes.object,
    onChange: PropTypes.func
  }
}
export default EventForm
