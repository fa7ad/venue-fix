import ScrollTrigger from 'react-scroll-trigger'
import { lifecycle } from 'recompose'

import SearchSection from './SearchSection'
import Category from './Category'
import Footer from '../common/Footer'
import { uiObserver } from '../uiStore'

const Home = ({ ui, history, ...p }) => (
  <div className='root'>
    <SearchSection />
    <Category history={history} />
    <ScrollTrigger onEnter={ui.navbar.toDark} onExit={ui.navbar.toNone}>
      <Footer />
    </ScrollTrigger>
  </div>
)

Home.propTypes = {
  ui: PropTypes.object.isRequired,
  history: PropTypes.object
}

const HomePage = lifecycle({
  componentDidMount () {
    this.props.ui.navbar.toNone()
  }
})(Home)

export default uiObserver(HomePage)
