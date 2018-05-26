import cx from 'classnames'
import React, { Component } from 'react'
import { Button } from 'reactstrap'

import css from './Footer.module.css'

class Footer extends Component {
  render () {
    return (
      <div className={css.footer__root}>
        <div className={cx('container', css.footer__container)}>
          <div>
            <h3>About Us</h3>
            <p className={css.nothing}>
              pppppppppppppp
            </p>
            <Button color='link'>see more</Button>
          </div>
          <div>
            <h3>About Us</h3>
            <p>ilhoilkhlikj</p>
          </div>
          <div>
            <h3>About Us</h3>
            <p>ilhoilkhlikj</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
