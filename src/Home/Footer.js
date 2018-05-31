import cx from 'classnames'
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'react-router-dom/Link'

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
  min-height: 200px;
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
                <iframe
                  title='Footer Map'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1663320130447!2d90.3935812145469!3d23.74144729503609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7f1d997a9e3b766b!2sHotel+Peacock+Ltd.!5e0!3m2!1sen!2sbd!4v1527421627382'
                />
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
