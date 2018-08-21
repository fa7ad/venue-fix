import SearchSection from './SearchSection'
import Category from './Category'
import { inObser } from '../store/utils'

const Home = ({ history, ...p }) => (
  <div className='root'>
    <SearchSection />
    <Category history={history} />
  </div>
)

Home.propTypes = {
  history: PropTypes.object
}

export default inObser(['ui'], Home)
