import React from 'react'
import { inject } from 'mobx-react'
import ScrollTrigger from 'react-scroll-trigger'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from './Footer'
import SocialMedia from './SocialMedia'

import './Home.css'

const Home = ({ ui, ...p }) => (
  <ScrollTrigger onEnter={ui.navbar.toNone}>
    <div className='root'>
      <SearchSection />
      <Category />
      <ScrollTrigger onEnter={ui.navbar.toDark} onExit={ui.navbar.toNone}>
        <Footer />
      </ScrollTrigger>
      <SocialMedia />
    </div>
  </ScrollTrigger>
)

export default inject('ui')(Home)
