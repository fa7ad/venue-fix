import React from 'react'
import SearchForm from './SearchForm'
import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className='home__root'>
        <SearchForm />
      </div>
    )
  }
}

export default Home
