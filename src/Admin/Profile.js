import ReactLoading from 'react-loading'
import { Alert, Input, Label, FormGroup, Button } from 'reactstrap'
import bcrypt from 'bcryptjs'

import Center from './Center'

import { inObser } from '../store/utils'
import req from '../request'

class ProfileFormDumb extends React.Component {
  state = {
    phone: this.props._id,
    name: this.props.name,
    address: this.props.address,
    password: this.props.password
  }

  render () {
    const valChange = name => e =>
      this.setState({ [name]: e.currentTarget.value })
    const onPasswordChange = e => {
      bcrypt.hash(e.currentTarget.value, 10).then(password => {
        this.setState({ password })
      })
    }
    return (
      <div className='form p-2'>
        <h1 className='border-bottom py-2'>Update Your Profile</h1>
        <div className='container-fluid'>
          <Alert
            color='success'
            isOpen={this.props.ui.dash.profile.formSuccess}
            toggle={this.props.ui.dash.profile.toggleSuccess}
          >
            Profile updated successfully!
          </Alert>
        </div>
        <FormGroup>
          <Label className='col-sm-8'>
            Name:
            <Input value={this.state.name} onChange={valChange('name')} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className='col-sm-4'>
            Phone:
            <Input value={this.state.phone} onChange={valChange('phone')} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className='col-sm-4'>
            Password:
            <Input
              type='password'
              defaultValue='falsehood'
              onChange={onPasswordChange}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className='col-sm-4'>
            Address:
            <Input value={this.state.address} onChange={valChange('address')} />
          </Label>
        </FormGroup>
        <FormGroup className='container-fluid'>
          <Button onClick={this.updateProfile}>Update Profile</Button>
        </FormGroup>
      </div>
    )
  }

  updateProfile = e => {
    e.preventDefault()
    req.url('/user').json(this.state).post().json(rep => {
      if (rep.success) this.props.ui.dash.profile.showSuccess()
    })
  }

  static propTypes = {
    name: PropTypes.string,
    _id: PropTypes.string,
    address: PropTypes.string,
    password: PropTypes.string,
    ui: PropTypes.object
  }
}

const ProfileForm = inObser(['ui'], ProfileFormDumb)

class Profile extends React.Component {
  state = {
    profile: undefined
  }

  render () {
    return this.state.profile
      ? <ProfileForm {...this.state.profile} />
      : <Center><ReactLoading type='spin' color='#373a3c' /></Center>
  }

  componentDidMount () {
    req
      .url('/user')
      .get()
      .unauthorized(_ => this.props.ui.auth.showModal())
      .json()
      .then(profile => this.setState({ profile }))
  }

  static propTypes = {
    ui: PropTypes.object
  }
}

export default inObser(['ui'], Profile)
