import React from 'react'
import cx from 'classnames'
import { Route, Switch, withRouter } from 'react-router-dom'

import Navigation from './common/Navigation'
import Home from './Home/'
import Tips from './Tips/'

import './App.css'

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
  }
]

const App = ({ location: { pathname } }) => {
  const [match] = routes.filter(r => r.path === pathname)

  return (
    <div className={cx('page', match.key)}>
      <Navigation />
      <Switch>
        {routes.map(props => <Route {...props} />)}
      </Switch>
    </div>
  )
}

export {routes}
export default withRouter(App)