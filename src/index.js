import express from 'express'
import app from './server'

import 'isomorphic-fetch'

if (module.hot) {
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...')
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT || 3000

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function (err) {
    if (err) {
      console.error(err)
      return
    }
    console.log(`> Listening on http://localhost:${port}/`)
  })
