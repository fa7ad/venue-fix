import cx from 'classnames'
import Pickr from 'react-flatpickr'
import { Button, Form, Input as Inp, Container } from 'reactstrap'
import { DateTime } from 'luxon'

import 'flatpickr/dist/themes/material_blue.css'

import Option from '../common/LowerOption'

import req from '../request'

const RootContainer = styled(Container)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Flatpickr = styled(Pickr)`
  &,
  &:disabled,
  &[readonly] {
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
    date: DateTime.local()
      .plus({ day: 1 })
      .startOf('day')
      .toJSDate(),
    categories: [],
    locations: []
  }

  render () {
    return (
      <RootContainer>
        <Form className={'justify-content-between row'} action='/event'>
          <Input name='location' type='select' placeholder='Location'>
            {this.state.locations.map((e, idx) => (
              <Option key={idx}>{e}</Option>
            ))}
          </Input>
          <Input name='category' type='select' placeholder='Category'>
            {this.state.categories.map(e => (
              <Option key={e._id}>{e.name}</Option>
            ))}
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
              dateFormat: 'd M Y',
              minDate: DateTime.local()
                .endOf('day')
                .toJSDate()
            }}
          />
          <input
            type='hidden'
            name='date'
            value={DateTime.fromJSDate(this.state.date).toMillis()}
          />
          <Input name='guests' placeholder='Guests' defaultValue='100' />
          <Button color='primary' className='col-sm-2'>
            Search
          </Button>
        </Form>
      </RootContainer>
    )
  }

  componentDidMount () {
    req
      .url('/tags')
      .get()
      .json(({ categories }) => this.setState({ categories }))
      .catch(e => console.error(e))
    req
      .url('/locations')
      .get()
      .json(({ locations }) => this.setState({ locations }))
      .catch(e => console.error(e))
  }
}

export default SearchSection
