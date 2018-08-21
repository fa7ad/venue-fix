import qs from 'qs'
import cx from 'classnames'
import pathEx from 'path-to-regexp'
import { Provider } from 'mobx-react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ScrollTrigger from 'react-scroll-trigger'

import Navigation from './common/Navigation'
import Footer from './common/Footer'
import Home from './Home/'
import Tips from './Tips/'
import TipsModal from './Tips/Modal'
import Auth from './Auth/'
import Event from './Event/'
import Admin from './Admin/'
import AdminNav from './Admin/Nav'
import FourOhFour from './FourOhFour/'
import AboutUs from './AboutUs/'
import ContactUs from './ContactUs/'

import { UI } from './store/'
import loadStyles from './styles'
loadStyles()

const uiStore = UI.create({
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
    key: 'contact-us',
    path: '/contact-us',
    component: ContactUs
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

const Modals = styled.div`
&&& {
  z-index: 1080;
}
`

const App = ({ location, history }) => {
  const [{ key: match }] = routes.filter(r =>
    pathEx(r.path || /.*/, []).test(location.pathname)
  )

  return (
    <Provider ui={uiStore}>
      <div className={cx('page', match)}>
        <Switch>
          <Route path='/admin/:page?'>
            <AdminNav history={history} />
          </Route>
          <Route>
            {match !== 'E404' && <Navigation page={match} history={history} />}
          </Route>
        </Switch>
        <Modals>
          <TipsModal />
          <Auth history={history} />
        </Modals>
        <Switch>
          {routes.map(props => <Route {...props} />)}
        </Switch>
        <Switch>
          <Route component={genNavbarFix(location, match, uiStore)} />
        </Switch>
        {!/E404|admin/.test(match) &&
          <ScrollTrigger
            onEnter={uiStore.navbar.toDark}
            onExit={uiStore.navbar.toNone}
            children={<Footer />}
          />}
      </div>
    </Provider>
  )
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

function genNavbarFix (location, match, ui) {
  class NavbarFix extends React.Component {
    render () {
      return <div data-what='navbar-color-fix' />
    }
    componentDidMount () {
      ui.navbar.toPage(match)
      if (location.search && match === 'home') {
        const { auth } = qs.parse(location.search.slice(1) || '')
        if (auth) ui.auth.showModal()
      }
    }
  }
  return NavbarFix
}

export { routes }

export default withRouter(App)
