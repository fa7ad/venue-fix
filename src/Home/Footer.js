import cx from 'classnames'
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'react-router-dom/Link'

import GoogleMap from 'google-map-react'

import Chevron from 'react-icons/lib/fa/chevron-right'
import FaMail from 'react-icons/lib/fa/envelope'
import FaPhone from 'react-icons/lib/fa/phone'

import css from './Footer.module.css'

const StyledCol = styled(Col).attrs({
  sm: p => p.sm || 3
})`
  text-align: justify;
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

class Footer extends Component {
  render () {
    return (
      <div className={cx(css.root)}>
        <Container className={cx(css.container)}>
          <Row className={cx(css.row)}>
            <StyledCol>
              <h3>About Us</h3>
              <p>
                Without a doubt, Venue Fix is the best way to find & discover the greatest places in the city.
              </p>
              <StyLink to='/about-us' className={cx('btn', 'bg-light')}>
                See More <Chevron />
              </StyLink>
            </StyledCol>
            <StyledCol sm='6'>
              <h3>Location With Map</h3>
              <Embed>
                <GoogleMap
                  defaultCenter={{
                    lat: 23.762301,
                    lng: 90.378749
                  }}
                  defaultZoom={15}
                >
                  <MapMarker lat={23.762301} lng={90.378749}>Parliament</MapMarker>
                </GoogleMap>
              </Embed>
            </StyledCol>
            <StyledCol>
              <h3>Contact Us</h3>
              <div className={css.contact}>
                <p><FaMail /> <span>venuefix@gmail.com</span></p>
                <p><FaMail /> <span>venuefix@gmail.com</span></p>
                <p><FaPhone /> <span>0100000000</span></p>
              </div>
            </StyledCol>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer
