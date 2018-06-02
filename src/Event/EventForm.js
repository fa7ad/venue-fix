import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

const StyContainer = styled(Container)`
  background-color: #fff;
`

const RowStyle = styled(Row)`
`
const ColStyle = styled(Col).attrs({
  sm: p => p.sm || 6
})`
`
const DivStyle = styled.div`
  display: flex;
`

const HeadTag = styled.h3`
  color: #23c6a1;
`

class EventForm extends Component {
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
                <Label for='exampleEmail'>Date & Time</Label>
                <DivStyle>
                  <Input
                    type='Date'
                    name='data'
                    id='dateId'
                    placeholder='date'
                  />
                  <Input
                    type='text'
                    name='text'
                    id='textId'
                    placeholder='Time'
                  />
                </DivStyle>
              </FormGroup>
            </ColStyle>
          </RowStyle>
          <HeadTag>PRICE</HeadTag>
          <RowStyle>
            <ColStyle>
              <FormGroup>
                <Label for='event'>Foods</Label>
                <DivStyle>
                  <Input
                    type='select'
                    name='event'
                    id='eventId'
                    placeholder='City'
                  >
                    <option>ChuiJaal</option>
                    <option>Nanna Biriyani</option>
                    <option>Bismilla Kabab</option>
                  </Input>
                  <Label for='event'>Drinks</Label>
                  <Input
                    type='select'
                    name='event'
                    id='eventId'
                    placeholder='City'
                  >
                    <option>Absoulate</option>
                    <option>100Pipers</option>
                    <option>Chery Wine</option>
                  </Input>
                </DivStyle>
              </FormGroup>
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
