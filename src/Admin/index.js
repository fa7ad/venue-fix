import { Col, Container } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import ReactLoading from 'react-loading'
// import cx from 'classnames'
import { spring, AnimatedSwitch } from 'react-router-transition'

import Sidebar from './Sidebar'
import ManageTips from './Tips'
import Bookings from './Bookings'
import Profile from './Profile'
import Categories from './Categories'
import Venues from './Venues'

import Center from './Center'

import { inObser } from '../store/utils'
import req from '../request'

const mapStyles = ({ opacity, scale, ...css }) => ({
  ...css,
  opacity: opacity,
  transform: `scale(${scale})`,
  flexBasis: '100%'
})

const bounce = val =>
  spring(val, {
    stiffness: 300,
    damping: 20
  })

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
    order: 1
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
    order: 3
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
    order: 2
  }
}

const FluidRoot = styled.div`
  @media (min-width: 768px) {
    flex-grow: 1;
    flex-basis: 100%;
  }

  display: flex;
  flex-direction: row;
  overflow: hidden;
`

const TempDash = p => (
  <Container fluid>
    <h1 className='my-4'>Dashboard</h1>
  </Container>
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
    show: false,
    tips: false
  }

  render () {
    const { ui } = this.props
    const { dash } = ui
    return this.state.show ? (
      <FluidRoot>
        <Sidebar active={dash.activePage} />
        <Col md='10' className='px-0 d-flex'>
          <AnimatedSwitch
            {...bounceTransition}
            mapStyles={mapStyles}
            className='d-flex flex-column w-100'>
            <Route path='/admin/' exact component={inObser(['ui'], TempDash)} />
            <Route path='/admin/bookings'>
              <Bookings />
            </Route>
            <Route path='/admin/profile'>
              <Profile />
            </Route>
            <Route path='/admin/tags'>
              <Categories />
            </Route>
            <Route path='/admin/venues'>
              <Venues ui={ui} />
            </Route>
            <Route path='/admin/tips'>
              <ManageTips routeCtx={this} />
            </Route>
          </AnimatedSwitch>
          <Switch>
            <Route path='/admin/:page' component={inObser(['ui'], NavHack)} />
          </Switch>
        </Col>
      </FluidRoot>
    ) : (
      <Center>
        <ReactLoading type='spin' color='#373a3c' />
      </Center>
    )
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
    const poll = setInterval(checkLogin, 15e3)
  }

  static propTypes = {
    ui: PropTypes.object,
    history: PropTypes.object
  }
}

export default inObser(['ui'], AdminPage)
