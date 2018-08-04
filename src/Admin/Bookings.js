import React from 'react'
import { Table } from 'reactstrap'
import { DateTime } from 'luxon'

const b64 = !global.btoa ? str => Buffer.from(str).toString('base64') : window.btoa

const lists = [
  {
    date: new Date('2018.07.16'),
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: new Date('2018.07.16'),
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: new Date('2018.07.16'),
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  },
  {
    date: new Date('2018.07.16'),
    venue: 'dhaka',
    duration: '5hr',
    cateringItem: 'yes',
    name: 'fahad',
    phone: '10255',
    address: 'comilla'
  }
]

const Bookings = p => (
  <div className='px-2'>
    <h2 className='py-2 border-bottom'>Bookings</h2>
    <Table striped dark responsive>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Venue</th>
          <th scope='col'>Duration</th>
          <th scope='col'>Catering?</th>
          <th scope='col'>Name</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Address</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((el, idx) => (
          <tr key={b64(+el.date + '__' + idx)}>
            <td>{DateTime.fromJSDate(el.date).toISODate()}</td>
            <td>{el.venue}</td>
            <td>{el.duration}</td>
            <td>{el.cateringItem}</td>
            <td>{el.name}</td>
            <td>{el.phone}</td>
            <td>{el.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)
export default Bookings
