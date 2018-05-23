import React from 'react'
import Navigation from './Navigation'
import SearchForm from './SearchForm'
import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className='home__root'>
        <Navigation />
        <SearchForm />
      </div>
    )
  }
}

export default Home
