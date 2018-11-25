import Slider from 'rc-slider'
import { DateTime } from 'luxon'
import { toLower } from 'ramda'
import Flatpickr from 'react-flatpickr'
import { Form, Label, Input, Button, Container, Row, Col } from 'reactstrap'

import 'rc-slider/assets/index.css'

import Option from '../common/LowerOption'

const StyContainer = styled(Container)`
  background-color: #fff;

  h3.text-primary {
    margin-top: 1em;
  }
`

const DatePicker = styled(Flatpickr)`
  &,
  &:read-only {
    background-color: #fff;
  }
`

const Range = Slider.createSliderWithTooltip(Slider.Range)

class EventForm extends React.Component {
  state = Object.assign(
    {
      date: DateTime.local()
        .plus({ day: 1 })
        .startOf('day')
        .toJSDate(),
      budget: [0, 50000],
      location: toLower('' + this.props.locations[0]),
      guests: '0',
      category: 'conference halls',
      catering: false
    },
    this.props.initialData,
    this.props.initialData.date && {
      date: DateTime.fromMillis(+this.props.initialData.date).toJSDate()
    }
  )

  valChange = name => e => {
    this.stateSet({ [name]: e.target.value })
  }

  stateSet = state =>
    this.setState(prev => {
      const next = state instanceof Function ? state(prev) : state
      this.props.onChange(Object.assign({}, prev, next))
      return next
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
                onChange={valChange('location')}>
                {this.props.locations.map((e, i) => (
                  <Option key={i}>{e}</Option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for='guests'>Guests</Label>
              <Input
                type='number'
                step={5}
                min={0}
                max={50000}
                id='guests'
                placeholder='Guest Count'
                value={this.state.guests}
                onChange={valChange('guests')}
              />
            </Col>
            <Col>
              <Label for='event'>Category</Label>
              <Input
                type='select'
                id='event'
                placeholder='Event'
                value={this.state.event}
                onChange={valChange('event')}>
                {this.props.tags.map(e => (
                  <Option key={e._id}>{e.name}</Option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for='date'>Date & Time</Label>
              <DatePicker
                id='date'
                value={this.state.date}
                onChange={([date]) => this.stateSet({ date })}
                className='form-control'
                options={{
                  minuteIncrement: 30,
                  dateFormat: 'd M Y',
                  minDate: DateTime.local()
                    .endOf('day')
                    .toJSDate()
                }}
              />
            </Col>
            <Col sm='2'>
              <Label for='catering'>Catering</Label>
              <Button
                color='secondary'
                id='catering'
                className='d-block'
                outline={!this.state.catering}
                onClick={e => this.stateSet(p => ({ catering: !p.catering }))}>
                {this.state.catering ? 'Required' : 'Not required'}
              </Button>
            </Col>
          </Row>
          <Row className='my-2'>
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
    this.props.onChange(this.state)
  }

  static propTypes = {
    initialData: PropTypes.object,
    onChange: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.string)
  }
}
export default EventForm
