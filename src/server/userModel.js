import { superstruct, struct } from 'superstruct'

const model = superstruct({
  types: {
    phone: val => struct('string').test(val) && val.length === 11
  }
})

const User = model(
  {
    phone: 'phone',
    name: 'string',
    address: 'string?',
    password: 'string',
    admin: 'boolean?'
  },
  {
    address: 'not given',
    admin: false
  }
)

export default User
