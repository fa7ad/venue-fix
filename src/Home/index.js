import SearchSection from './SearchSection'
import Category from './Category'
import { uiObserver } from '../uiStore'

const Home = ({ history, ...p }) => (
  <div className='root'>
    <SearchSection />
    <Category history={history} />
  </div>
)

Home.propTypes = {
  history: PropTypes.object
}

export default uiObserver(Home)
