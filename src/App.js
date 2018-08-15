import qs from 'qs'
import cx from 'classnames'
import pathEx from 'path-to-regexp'
import { Route, Switch, withRouter } from 'react-router-dom'

import Navigation from './common/Navigation'
import Home from './Home/'
import Tips from './Tips/'
import TipsModal from './Tips/Modal'
import Auth from './Auth/'
import Event from './Event/'
import Admin from './Admin/'
import AdminNav from './Admin/Nav'
import FourOhFour from './FourOhFour/'
import AboutUs from './AboutUs/'

import { Provider } from 'mobx-react'
import { IconContext } from 'react-icons'
import UiStore from './uiStore'

import './App.css'
import 'rodal/lib/rodal.css'
import { lifecycle } from 'recompose'

// TODO: remove when package fixes bug
// FIXME
global.IconContext = IconContext

const uiStore = UiStore.create({
  navbar: {},
  auth: {},
  dash: { profile: {} },
  tip: { activeTip: {} },
  form: {}
})

const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home
  },
  {
    key: 'home auth',
    path: '/auth',
    render: p => {
      uiStore.auth.showModal()
      return <Home />
    }
  },
  {
    key: 'tips',
    path: '/tips',
    component: Tips
  },
  {
    key: 'event',
    path: '/event',
    component: Event
  },
  {
    key: 'about-us',
    path: '/about-us',
    component: AboutUs
  },
  {
    key: 'admin',
    path: '/admin/:page?',
    component: Admin
  },
  {
    key: 'E404',
    component: FourOhFour
  }
]

const App = ({ location, history }) => {
  const [{ key: match }] = routes.filter(r =>
    pathEx(r.path || /.*/, []).test(location.pathname)
  )

  return (
    <Provider ui={uiStore}>
      <div className={cx('page', match)}>
        {match !== 'E404' &&
          (match === 'admin'
            ? <AdminNav history={history} />
            : <Navigation page={match} history={history} />)}
        <div className='modals' style={{ zIndex: 1080 }}>
          <TipsModal />
          <Auth />
        </div>
        <Switch>
          {routes.map(props => <Route {...props} />)}
        </Switch>
        <Switch>
          <Route
            component={lifecycle({
              componentDidMount () {
                uiStore.navbar.toPage(match)
                if (location.search && match === 'home') {
                  const { auth } = qs.parse(location.search.slice(1) || '')
                  if (auth) uiStore.auth.showModal()
                }
              }
            })(p => <div data-what='navbar-color-fix' />)}
          />
        </Switch>
      </div>
    </Provider>
  )
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export { routes }

export default withRouter(App)
