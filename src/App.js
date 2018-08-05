import React from 'react'
import PropTypes from 'prop-types'
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
  dash: {},
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
  const { pathname } = location
  const [{ key: match }] = routes
    .filter(r => pathEx(r.path || '', []).test(pathname))
    .slice(0, 1)

  return (
    <Provider ui={uiStore}>
      <div className={cx('page', match)}>
        {match !== 'E404' &&
          (match === 'admin'
            ? <AdminNav />
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
