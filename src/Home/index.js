import React from 'react'
import SearchSection from './SearchSection'
import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className='home__root'>
        <SearchSection />
      </div>
    )
  }
}

export default Home
