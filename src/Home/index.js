import React from 'react'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from './Footer'

import './Home.css'

class Home extends React.Component {
  render () {
    return (
      <div className='home__root'>
        <SearchSection />
        <Category />
        <Footer />
      </div>
    )
  }
}

export default Home
