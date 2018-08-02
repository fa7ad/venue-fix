import cx from 'classnames'
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'react-router-dom/Link'

import GoogleMap from 'google-map-react'

import {
  FaChevronRight,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa'

const Root = styled.div`
  color: #fff;
  background-color:#1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyContainer = styled(Container)`
  padding: 15px 0;
  flex-basis: 100%;
  @media (max-width: 640px) {
    padding: 15px;
  }
`

const StyRow = styled(Row)`
  min-height: 25vh;
`

const SocialRow = styled(Row)`
  padding: 10px auto;
`

const StyHr = styled.hr`
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 150vw;
    left: -50%;
    height: 1px;
    background: #777;
  }
`

const StyCol = styled(Col).attrs({
  sm: p => p.sm || 3
})`
  text-align: justify;
  svg {
    margin: auto 5px;
  }
`

const StyLink = styled(Link)`
  svg {
    position: relative;
    left: 0;
    transition: 150ms all ease-in-out;
  }

  &:hover {
    svg {
      left: 2px;
    }
  }
`

const MapMarker = styled.div`
  position: relative;
  color: red;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.div`
  flex-basis: 100%;
  svg {
    margin-right: 5px;
    fill: rgba(255, 255, 255, 0.5);
  }
`

class Footer extends Component {
  render () {
    return (
      <Root>
        <StyContainer>
          <StyRow>
            <StyCol>
              <h3>About Us</h3>
              <p>
                Without a doubt, Venue Fix is the best way to find & discover the greatest places in the city.
              </p>
              <StyLink to='/about-us' className={cx('btn', 'bg-light')}>
                See More <FaChevronRight />
              </StyLink>
            </StyCol>
            <StyCol sm='6'>
              <h3>Location With Map</h3>
              <div className='embed-responsive' style={{ height: 200 }}>
                <GoogleMap
                  defaultCenter={{
                    lat: 23.762301,
                    lng: 90.378749
                  }}
                  defaultZoom={15}
                  bootstrapURLKeys={{
                    key: '***REMOVED***'
                  }}
                >
                  <MapMarker lat={23.762301} lng={90.378749}>
                    Bangladesh <br />
                    Parliament
                  </MapMarker>
                </GoogleMap>
              </div>
            </StyCol>
            <StyCol>
              <h3>Contact Us</h3>
              <List>
                <ListItem><FaEnvelope /> venuefix@gmail.com</ListItem>
                <ListItem><FaEnvelope /> venuefix@gmail.com</ListItem>
                <ListItem><FaPhone /> +8801xxxxxxxxx</ListItem>
              </List>
            </StyCol>
          </StyRow>
          <StyHr />
          <SocialRow>
            <StyCol>
              nothing
            </StyCol>
            <StyCol sm='6' className='text-center'>
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </StyCol>
            <StyCol>nothing</StyCol>
          </SocialRow>
        </StyContainer>
      </Root>
    )
  }
}

export default Footer
