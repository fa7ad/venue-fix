import cx from 'classnames'
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'react-router-dom/Link'

import GoogleMap from 'google-map-react'

import Chevron from 'react-icons/lib/fa/chevron-right'
import FaMail from 'react-icons/lib/fa/envelope'
import FaPhone from 'react-icons/lib/fa/phone'
import FaceBook from 'react-icons/lib/fa/facebook'
import Twitter from 'react-icons/lib/fa/twitter'
import Youtube from 'react-icons/lib/fa/youtube-play'
import Instagram from 'react-icons/lib/fa/instagram'

const Root = styled.div`
  color: #fff;
  background-color:#1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
  flex-basis: 100%;
`

const StyRow = styled(Row)`
  min-height: 25vh;
`

const SocRow = styled(Row)`
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

const Embed = styled.div.attrs({
  className: p => cx('embed-responsive', p.className)
})`
  height: 200px;
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
                See More <Chevron />
              </StyLink>
            </StyCol>
            <StyCol sm='6'>
              <h3>Location With Map</h3>
              <Embed>
                <GoogleMap
                  defaultCenter={{
                    lat: 23.762301,
                    lng: 90.378749
                  }}
                  defaultZoom={15}
                >
                  <MapMarker lat={23.762301} lng={90.378749}>
                    Parliament
                  </MapMarker>
                </GoogleMap>
              </Embed>
            </StyCol>
            <StyCol>
              <h3>Contact Us</h3>
              <List>
                <ListItem><FaMail /> venuefix@gmail.com</ListItem>
                <ListItem><FaMail /> venuefix@gmail.com</ListItem>
                <ListItem><FaPhone /> +8801xxxxxxxxx</ListItem>
              </List>
            </StyCol>
          </StyRow>
          <StyHr />
          <SocRow>
            <StyCol>
              nothing
            </StyCol>
            <StyCol sm={6} className='text-center'>
              <FaceBook />
              <Twitter />
              <Instagram />
              <Youtube />
            </StyCol>
            <StyCol>nothing</StyCol>
          </SocRow>
        </StyContainer>
      </Root>
    )
  }
}

export default Footer
