import { Table } from 'reactstrap'

const b64 = global.btoa || (str => Buffer.from(str).toString('base64'))

const lists = [
  {
    date: '2018.07.16',
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: '2018.07.16',
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: '2018.07.16',
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: '2018.07.16',
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  }
]

const Booking = ({ date, venue, cateringItem, phone, address }) => (
  <tr>
    <td>{date}</td>
    <td>{venue}</td>
    <td>{cateringItem}</td>
    <td>{name}</td>
    <td>{phone}</td>
    <td>{address}</td>
  </tr>
)

Booking.propTypes = {
  date: PropTypes.string,
  venue: PropTypes.string,
  cateringItem: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string
}

const Bookings = p => (
  <div className='px-2'>
    <h2 className='py-2 border-bottom'>Bookings</h2>
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
          <Booking key={b64(el.date.concat(idx, idx))} {...el} />
        ))}
      </tbody>
    </Table>
  </div>
)
export default Bookings
