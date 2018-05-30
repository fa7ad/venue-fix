import cx from 'classnames'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import FaceBook from 'react-icons/lib/fa/facebook'
import Twitter from 'react-icons/lib/fa/twitter'
import Youtube from 'react-icons/lib/fa/youtube-play'
import Instagram from 'react-icons/lib/fa/instagram'
import css from './SocialMedia.module.css'

const StyledCol = styled(Col).attrs({
  sm: p => p.sm || 3
})`
  text-align: justify;
`

class SocialMedia extends Component {
  render () {
    return (
      <div className={cx(css.root)}>
        <Container className={cx(css.container)}>
          <Row>
            <StyledCol>
              nothing
            </StyledCol>
            <StyledCol sm={6} className={cx('text-center', css['space-icons'])}>
              <FaceBook />
              <Twitter />
              <Instagram />
              <Youtube />
            </StyledCol>
            <StyledCol>nothing</StyledCol>
          </Row>
        </Container>
      </div>
    )
  }
}

export default SocialMedia
