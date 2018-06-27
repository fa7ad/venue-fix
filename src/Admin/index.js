import React from 'react'
import styled from 'styled-components'

import { Home, File, PlusCircle } from 'react-feather'

import chart from '../images/chart.png'

const FluidRoot = styled.div`
  margin-top: 2rem;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;

  & > .row {
    flex-basis: 100%;
  }
`

export default p => (
  <FluidRoot className='container-fluid'>
    <div className='row'>
      <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
        <div className='sidebar-sticky'>
          <ul className='nav flex-column'>
            <div className='nav-item'>&nbsp;</div>
            <li className='nav-item'>
              <a className='nav-link active' href='#'>
                <Home size={12} />
                Dashboard <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <File size={12} />
                Bookings
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <PlusCircle size={12} />
                Add tips
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
          <h1 className='h2'>Dashboard</h1>
          <div className='btn-toolbar mb-2 mb-md-0'>
            <div className='btn-group mr-2'>
              <button className='btn btn-sm btn-outline-secondary'>
                Share
              </button>
              <button className='btn btn-sm btn-outline-secondary'>
                Export
              </button>
            </div>
            <button className='btn btn-sm btn-outline-secondary dropdown-toggle'>
              <span data-feather='calendar' />
              This week
            </button>
          </div>
        </div>

        <img className='my-4 w-100' src={chart} />
      </main>
    </div>
  </FluidRoot>
)
