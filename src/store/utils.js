import { curry } from 'ramda'
import { inject as oinject, observer } from 'mobx-react'

const inObser = curry((stores, com) => oinject(...stores)(observer(com)))

export { inObser }
