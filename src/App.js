import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Home from './Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/tips' render={p => <div> HI </div>} />
  </Switch>
)

export default App
