import React from 'react'

import SearchSection from './SearchSection'
import Category from './Category'

import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className='home__root'>
        <SearchSection />
        <Category />
      </div>
    )
  }
}

export default Home
