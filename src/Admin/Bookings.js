import React from 'react'
import { Table } from 'reactstrap'
import { DateTime } from 'luxon'

const lists = [
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
  <div>
    <h2 className='py-2'>Bookings</h2>
    <Table striped dark responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Venue</th>
          <th>Duration</th>
          <th>Catering?</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {lists.map(el => (
          <tr key={el.date}>
            <th scope='row'>{DateTime.fromJSDate(el.date).toISODate()}</th>
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
