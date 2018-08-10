import { hydrate, render } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'

import App from './App'

const root = document.getElementById('root')
const renderer = root.hasChildNodes() ? hydrate : render

renderer(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
)

if (module.hot) module.hot.accept()
