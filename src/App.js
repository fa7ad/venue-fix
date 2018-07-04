import React from 'react'
import types from 'prop-types'
import cx from 'classnames'
import { Route, Switch, withRouter } from 'react-router-dom'

import Navigation from './common/Navigation'
import Home from './Home/'
import Tips from './Tips/'
import Auth from './Auth/'
import Event from './Event/'
import Admin from './Admin/'
import FourOhFour from './FourOhFour/'

import { Provider } from 'mobx-react'
import UiStore from './uiStore'

import './App.css'

const uiStore = UiStore.create({
  navbar: {},
  auth: {}
})

const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home
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
    path: '/admin',
    component: Admin
  },
  {
    key: 'E404',
    path: '/*',
    component: FourOhFour
  }
]

const AdminNav = p => (
  <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
    <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='#'>venue-fix</a>
    <div className='w-100' />
    <ul className='navbar-nav px-3'>
      <li className='nav-item text-nowrap'>
        <a className='nav-link' href='#'>Sign out</a>
      </li>
    </ul>
  </nav>
)

const App = ({ location: { pathname }, history }) => {
  const [match] = routes.filter(r => r.path === pathname)

  return (
    <Provider ui={uiStore}>
      <div className={cx('page', (match && match.key) || 'E404')}>
        {match &&
          match.key !== 'admin' &&
          <Navigation page={match.key} {...{ history }} />}
        {match.key === 'admin' && <AdminNav />}
        <Auth />
        <Switch>
          {routes.map(props => <Route {...props} />)}
        </Switch>
      </div>
    </Provider>
  )
}

App.propTypes = {
  location: types.object.isRequired,
  history: types.object.isRequired
}

export { routes }
export default withRouter(App)
