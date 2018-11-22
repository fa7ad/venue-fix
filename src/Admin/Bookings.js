import { Table, Container, Button } from 'reactstrap'

import req from '../request'

const b64 = global.btoa || (str => Buffer.from(str).toString('base64'))

const Booking = ({
  date,
  venue,
  catering,
  phone,
  address,
  name,
  confirm,
  onConfirm,
  id
}) => (
  <tr>
    <td>{date}</td>
    <td>{venue}</td>
    <td>{catering || 'false'}</td>
    <td>{name}</td>
    <td>{phone}</td>
    <td>{address}</td>
    <td>{'' + (confirm || 'false')}</td>
    <td>
      <Button onClick={e => onConfirm(id)}>Confirm</Button>
    </td>
  </tr>
)

Booking.propTypes = {
  date: PropTypes.string,
  venue: PropTypes.string,
  name: PropTypes.string,
  catering: PropTypes.bool,
  confirm: PropTypes.bool,
  phone: PropTypes.string,
  address: PropTypes.string,
  id: PropTypes.string,
  onConfirm: PropTypes.func
}

class Bookings extends React.PureComponent {
  state = {
    bookings: []
  }

  render () {
    const { bookings } = this.state
    return (
      <Container fluid>
        <h1 className='my-4'>Bookings</h1>
        <Table striped dark responsive>
          <thead>
            <tr>
              <th scope='col'>Date</th>
              <th scope='col'>Venue</th>
              <th scope='col'>Catering?</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Address</th>
              <th scope='col'>Confirmed?</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((el, idx) => (
              <Booking
                key={b64(idx)}
                {...el}
                id={el._id || ''}
                onConfirm={this.confirmById}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }

  componentDidMount () {
    this.updateData()
  }

  updateData = () => {
    req
      .url('/bookings')
      .get()
      .json(({ bookings }) => this.setState({ bookings }))
      .catch(_ => this.props.ui.auth.showModal())
  }

  confirmById = id => {
    req
      .url('/bookings')
      .json({ booking: id })
      .put()
      .json(res => this.updateData())
  }
}
export default Bookings
