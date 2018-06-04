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
import styled from 'styled-components'

import 'rc-slider/assets/index.css'

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
  state = {
    date: DateTime.local().plus({ day: 1 }).startOf('day').toJSDate(),
    budget: [0, 250000]
  }
  render () {
    return (
      <Form>
        <StyContainer>
          <h3 className='text-primary'>EVENT DETAILS</h3>
          <Row>
            <Col>
              <Label for='city'>City</Label>
              <Input type='select' placeholder='City' id='city'>
                <option>Dhaka</option>
                <option>Comilla</option>
                <option>Chittagong</option>
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
              />
            </Col>
            <Col>
              <Label for='eventType'>Event Type</Label>
              <Input type='select' id='eventType' placeholder='Event Type'>
                <option>Birthday Paty</option>
                <option>Baby Shower</option>
                <option>Marrige</option>
              </Input>
            </Col>
            <Col sm='4'>
              <Label for='date'>Date & Time</Label>
              <DatePicker
                data-enable-time
                id='date'
                value={this.state.date}
                onChange={date => this.setState({ date })}
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
                <Input type='number' min='1' id='duration' />
                <InputGroupAddon addonType='append'>
                  hr
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <h3 className='text-primary'>PRICE</h3>
          <Row>
            <Col>
              <Label for='foods'>Foods</Label>
              <Input type='select' id='foods'>
                <option>ChuiJhaal</option>
                <option>Nanna Biriyani</option>
                <option>Bismilla Kabab</option>
              </Input>
            </Col>
            <Col>
              <Label for='drinks'>Drinks</Label>
              <Input type='select' id='drinks'>
                <option>Coca-Cola</option>
                <option>Sprite</option>
                <option>Fanta</option>
              </Input>
            </Col>
            <Col sm='6'>
              <Label for='budget'>Budget</Label>
              <Range
                id='budget'
                min={0}
                max={250000}
                step={500}
                value={this.state.budget}
                onChange={budget => this.setState({ budget })}
              />
            </Col>
          </Row>
        </StyContainer>
      </Form>
    )
  }
}
export default EventForm
