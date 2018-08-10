import React, { Component } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

const ProfileForm = p => (
  <pre>
    {JSON.stringify(p, null, 2)}
  </pre>
)

const Center = styled.div`
  height: 100%
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Profile extends Component {
  state = {
    profile: undefined
  }

  render () {
    return this.state.profile
      ? <ProfileForm {...this.state.profile} />
      : <Center><ReactLoading type='spin' color='#373a3c' /></Center>
  }
}

export default Profile
