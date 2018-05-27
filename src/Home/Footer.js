import cx from 'classnames'
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import css from './Footer.module.css'

const StyledCol = styled(Col).attrs({
  sm: 4
})`
  text-align: center;
`

class Footer extends Component {
  render () {
    return (
      <div className={cx(css.root)}>
        <Container className={cx(css.container)}>
          <Row className={cx(css.row)}>
            <StyledCol>
              <h3>Hi</h3>
            </StyledCol>
            <StyledCol>
              <h3>Hi</h3>
            </StyledCol>
            <StyledCol>
              <h3>Hi</h3>
            </StyledCol>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer
