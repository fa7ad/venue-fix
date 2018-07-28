import React, { Component } from 'react'
import { Row, Container } from 'reactstrap'

import image1 from '../images/hotel.jpg'
import image2 from '../images/hotel2.jpg'
import image3 from '../images/hotel3.jpg'
import PictureCard from './PictureCard'

import css from './Category.module.css'

class Category extends Component {
  render () {
    return (
      <div className={css.root}>
        <Container>
          <div className={css.header}>
            <h3>Featured Categories</h3>
          </div>

          <Row className={css.row}>
            <PictureCard bgImg={image1} size='6' caption='Hotels'>
              Cat 1
            </PictureCard>
            <PictureCard bgImg={image2} size='3' caption='Hotels' btn='danger'>
              Cat 1
            </PictureCard>
            <PictureCard bgImg={image3} size='3' caption='Hotels'>
              Cat 1
            </PictureCard>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Category
