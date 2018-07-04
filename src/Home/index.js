import React from 'react'
import types from 'prop-types'
import { inject } from 'mobx-react'
import ScrollTrigger from 'react-scroll-trigger'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from '../common/Footer'

import './Home.css'

const Home = ({ ui, ...p }) => (
  <div className='root'>
    <SearchSection />
    <Category />
    <ScrollTrigger onEnter={ui.navbar.toDark} onExit={ui.navbar.toNone}>
      <Footer />
    </ScrollTrigger>
  </div>
)

Home.propTypes = {
  ui: types.object.isRequired
}

export default inject('ui')(Home)
