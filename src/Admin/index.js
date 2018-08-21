import { Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'

import Sidebar from './Sidebar'
import ManageTips from './Tips'
import Bookings from './Bookings'
import Profile from './Profile'
import Categories from './Categories'
import Venues from './Venues'

import Center from './Center'

import { inObser } from '../store/utils'
import req from '../request'

import ReactLoading from 'react-loading'

const FluidRoot = styled.div`
  @media (min-width: 768px) {
    flex-grow: 1;
    flex-basis: 100%;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const TempDash = p => (
  <div>
    <h2 className='d-flex border-bottom py-2'>Dashboard</h2>
  </div>
)

class NavHack extends React.Component {
  render () {
    return <div data-what='navigation' />
  }
  componentDidMount () {
    const { dash } = this.props.ui
    const { page } = this.props.match.params
    if (dash.activePage !== page) dash.activate(page)
  }
  static propTypes = {
    ui: PropTypes.object,
    match: PropTypes.object
  }
}

class AdminPage extends React.Component {
  state = {
    show: false
  }

  render () {
    const { ui } = this.props
    const { dash } = ui
    return this.state.show
      ? <FluidRoot>
        <Sidebar active={dash.activePage} />
        <Col md='10' className='px-0'>
          <Switch>
            <Route path='/admin/' exact component={inObser(['ui'], TempDash)} />
            <Route path='/admin/tips'>
              <ManageTips />
            </Route>
            <Route path='/admin/bookings'>
              <Bookings />
            </Route>
            <Route path='/admin/profile'><Profile /></Route>
            <Route path='/admin/tags'><Categories /></Route>
            <Route path='/admin/venues'><Venues /></Route>
          </Switch>
          <Switch>
            <Route path='/admin/:page' component={inObser(['ui'], NavHack)} />
          </Switch>
        </Col>
      </FluidRoot>
      : <Center><ReactLoading type='spin' color='#373a3c' /></Center>
  }

  componentDidMount () {
    const checkLogin = _ =>
      req
        .url('/loggedIn')
        .get()
        .unauthorized(_ => {
          clearInterval(poll)
          this.props.history.push('/?auth=login')
        })
        .json(data => data.admin)
    checkLogin().then(show => this.setState({ show }))
    const poll = setInterval(checkLogin, 2500)
  }

  static propTypes = {
    ui: PropTypes.object,
    history: PropTypes.object
  }
}

export default inObser(['ui'], AdminPage)
