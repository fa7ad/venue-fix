import qs from 'qs'
import cx from 'classnames'
import pathEx from 'path-to-regexp'
import { Route, Switch, withRouter } from 'react-router-dom'

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

import ScrollTrigger from 'react-scroll-trigger'
import { Provider } from 'mobx-react'
import { IconContext } from 'react-icons'
import { injectGlobal } from 'styled-components'

import UiStore from './uiStore'

import img from './images/img.jpg'
import 'rodal/lib/rodal.css'

injectGlobal`
body, html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

#root {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
}

.page {
  flex-basis: 100%;
}

.page.home {
  background: url(${img});
  background-size: 100% 60vmax;
  background-position: center top;
  background-repeat: no-repeat;
}

.page.E404 {
  display: flex;
}

.page.event, .page.tips, .page.admin, .page.about-us, .page.contact-us {
  display: flex;
  flex-direction: column;
}

.rdw-image-modal {
  left: auto !important;
  right: 5px;
}

.rdw-image-modal-upload-option-label {
  overflow: hidden !important;
}
`

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
          <Auth history={history} />
        </div>
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
