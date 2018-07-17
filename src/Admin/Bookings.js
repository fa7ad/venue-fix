import React from 'react'
import { Table } from 'reactstrap'
import {DateTime} from 'luxon'

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
  <Table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Venue</th>
        <th>Duration</th>
        <th>Catering-item</th>
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
)
export default Bookings

// <td>{lists.map(el => <tr>{el.date}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.venue}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.duration}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.cateringItem}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.name}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.phone}</tr>)}</td>
// <td>{lists.map(el => <tr>{el.address}</tr>)}</td>
