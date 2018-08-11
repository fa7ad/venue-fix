import { inject } from 'mobx-react'
import ScrollTrigger from 'react-scroll-trigger'
import { lifecycle } from 'recompose'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from '../common/Footer'

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
  ui: PropTypes.object.isRequired
}

const HomePage = lifecycle({
  componentDidMount () {
    this.props.ui.navbar.toNone()
  }
})(Home)

export default inject('ui')(HomePage)
