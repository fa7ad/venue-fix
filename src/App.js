import React from 'react'
import cx from 'classnames'
import { Route, Switch, withRouter } from 'react-router-dom'

import Navigation from './common/Navigation'
import Home from './Home/'
import Tips from './Tips/'
import FourOhFour from './FourOhFour/'

import { Provider } from 'mobx-react'
import UiStore from './uiStore'

import './App.css'

const uiStore = new UiStore()

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
    key: 'E404',
    path: '/*',
    component: FourOhFour
  }
]

const App = ({ location: { pathname } }) => {
  const [match] = routes.filter(r => r.path === pathname)

  return (
    <Provider ui={uiStore}>
      <div className={cx('page', (match && match.key) || 'E404')}>
        {match && <Navigation />}
        <Switch>
          {routes.map(props => <Route {...props} />)}
        </Switch>
      </div>
    </Provider>
  )
}

export { routes }
export default withRouter(App)
