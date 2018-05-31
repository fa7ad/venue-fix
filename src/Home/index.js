import React from 'react'
import { inject } from 'mobx-react'
import ScrollTrigger from 'react-scroll-trigger'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from './Footer'
import SocialMedia from './SocialMedia'

import './Home.css'

const Home = ({ ui, ...p }) => (
  <div className='root'>
    <SearchSection />
    <Category />
    <ScrollTrigger
      onEnter={ui.setOpaqueNav}
      onExit={ui.setTranspNav}
    >
      <Footer />
    </ScrollTrigger>
    <SocialMedia />
  </div>
)

export default inject('ui')(Home)
