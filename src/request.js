import 'isomorphic-fetch'
import wretch from 'wretch'

const f = wretch()
  .errorType('json')
  .options({ credentials: 'include', mode: 'cors' })

export default f
