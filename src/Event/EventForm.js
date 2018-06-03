import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

const StyContainer = styled(Container)`
  background-color: #fff;
`

const RowStyle = styled(Row)`
`
const ColStyle = styled(Col).attrs({
  sm: p => p.sm || 6
})``

const ColAsCol = styled(Col)`
  display: flex;
  flex-direction: column;
`

const DivStyle = styled.div`
  display: flex;
`

const HeadTag = styled.h3`
  color: #23c6a1;
`

class EventForm extends Component {
  state = {
    date: new Date()
  }
  render () {
    return (
      <Form>
        <StyContainer>
          <HeadTag>EVENT DETAILS</HeadTag>
          <RowStyle>
            <ColStyle>
              <FormGroup>
                <Label for='event'>Your Event</Label>
                <DivStyle>
                  <Input
                    type='select'
                    name='event'
                    id='eventId'
                    placeholder='City'
                  >
                    <option>Dhaka</option>
                    <option>Comilla</option>
                    <option>Chittagong</option>
                  </Input>
                  <Input
                    type='select'
                    name='eventType'
                    id='eventId'
                    placeholder='Event Type'
                  >
                    <option>Birthday Paty</option>
                    <option>Baby Shower</option>
                    <option>Marrige</option>
                  </Input>
                  <Input
                    type='text'
                    name='guest'
                    id='guestId'
                    placeholder='Guest Count'
                  />
                </DivStyle>
              </FormGroup>
            </ColStyle>
            <ColStyle>
              <FormGroup>
                <Label for='dateId'>Date & Time</Label>
                <DivStyle>
                  <Flatpickr
                    data-enable-time
                    value={this.state.date}
                    onChange={date => {
                      this.setState({ date })
                    }}
                  />
                  <Input type='text' name='time' id='time' placeholder='Time' />
                </DivStyle>
              </FormGroup>
            </ColStyle>
          </RowStyle>
          <HeadTag>PRICE</HeadTag>
          <RowStyle>
            <ColStyle className='row'>
              <ColAsCol>
                <FormGroup>
                  <Label for='drinks'>Drinks</Label>
                  <Input type='select' name='foods' id='foods'>
                    <option>ChuiJhaal</option>
                    <option>Nanna Biriyani</option>
                    <option>Bismilla Kabab</option>
                  </Input>
                </FormGroup>
              </ColAsCol>
              <ColAsCol>
                <Label for='foods'>Foods</Label>
                <Input type='select' name='drinks' id='drinks'>
                  <option>Coca-Cola</option>
                  <option>Sprite</option>
                  <option>Fanta</option>
                </Input>
              </ColAsCol>
            </ColStyle>
            <ColStyle>
              <FormGroup>
                <Label for='event'>Budget</Label>
                <Input
                  type='text'
                  name='budget'
                  id='budgetId'
                  placeholder='Budget'
                />
              </FormGroup>
            </ColStyle>
          </RowStyle>
        </StyContainer>
      </Form>
    )
  }
}
export default EventForm
