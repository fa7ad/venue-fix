import cx from 'classnames'
import Pickr from 'react-flatpickr'
import { Button, Form, Input as Inp, Container } from 'reactstrap'
import { DateTime } from 'luxon'

import 'flatpickr/dist/themes/material_blue.css'

import Option from '../common/LowerOption'

const RootContainer = styled(Container)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center
`

const Flatpickr = styled(Pickr)`
  &, &:disabled, &[readonly] {
    background-color: #fff;
  }
`

const Input = styled(Inp).attrs({
  className: p => cx('col-sm-2', p.className)
})`
  @media (min-width: 576px) {
    flex-basis: 17%;
    max-width: 17%;
  }
`

class SearchSection extends React.Component {
  state = {
    date: DateTime.local().plus({ day: 1 }).startOf('day').toJSDate()
  }

  render () {
    return (
      <RootContainer>
        <Form className={'justify-content-between row'} action='/event'>
          <Input
            name='location'
            type='select'
            placeholder='City'
          >
            <Option>Dhaka</Option>
            <Option>Comilla</Option>
            <Option>Chittagong</Option>
          </Input>
          <Input
            name='event'
            type='select'
            placeholder='Type Of Event'
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
            className='col-sm-3 form-control'
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
          />
          <Button color='primary' className='col-sm-2'>
            Search
          </Button>
        </Form>
      </RootContainer>
    )
  }
}
export default SearchSection
