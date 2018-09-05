import { Table, Container } from 'reactstrap'

const b64 = global.btoa || (str => Buffer.from(str).toString('base64'))

const lists = [
  // {
  //   date: '2018.07.16',
  //   venue: 'venue-awesome',
  //   duration: '5hr',
  //   catering: 'yes',
  //   name: 'fahad',
  //   phone: '10255',
  //   address: 'comilla'
  // },
  // {
  //   date: '2018.07.16',
  //   venue: 'venue-awesome',
  //   duration: '5hr',
  //   catering: 'yes',
  //   name: 'fahad',
  //   phone: '10255',
  //   address: 'comilla'
  // },
  // {
  //   date: '2018.07.16',
  //   venue: 'venue-awesome',
  //   duration: '5hr',
  //   catering: 'yes',
  //   name: 'fahad',
  //   phone: '10255',
  //   address: 'comilla'
  // },
  // {
  //   date: '2018.07.16',
  //   venue: 'venue-awesome',
  //   duration: '5hr',
  //   catering: 'yes',
  //   name: 'fahad',
  //   phone: '10255',
  //   address: 'comilla'
  // }
]

const Booking = ({ date, venue, catering, phone, address, name }) => (
  <tr>
    <td>{date}</td>
    <td>{venue}</td>
    <td>{catering}</td>
    <td>{name}</td>
    <td>{phone}</td>
    <td>{address}</td>
  </tr>
)

Booking.propTypes = {
  date: PropTypes.string,
  venue: PropTypes.string,
  name: PropTypes.string,
  catering: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string
}

const Bookings = p => (
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
        </tr>
      </thead>
      <tbody>
        {lists.map((el, idx) => (
          <Booking key={b64(el.date.concat(idx))} {...el} />
        ))}
      </tbody>
    </Table>
  </Container>
)
export default Bookings
