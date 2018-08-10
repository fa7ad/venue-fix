import 'isomorphic-fetch'
import wretch from 'wretch'

const f = wretch().options({ credentials: 'include', mode: 'cors' })

export default f
