import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, CardTitle, CardImg, Col, Badge } from 'reactstrap'

const CardStyle = styled(Card)`
  img {
    min-height: 250px;
  }
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const Venues = ({ children, bgImg, size, price, tags, capacity, catering, ...p }) => (
  <Col sm={size || 3} {...p}>
    <CardStyle>
      <CardImg top width='100%' src={bgImg} />
      <CardTitle>
        {children}
        <br />
        <span className='text-muted'>{'\u09F3 ' + price}</span>
        <br />
        <div>
          {tags.map((t, i) => (
            <Badge color='primary' key={'cat-0' + i}>{t}</Badge>
          ))}
        </div>
        <div>
          <Badge color='secondary'>Capacity: {capacity}</Badge>
          <Badge color='danger'>Catering: {catering ? 'Yes' : 'No'}</Badge>
        </div>
      </CardTitle>
    </CardStyle>
  </Col>
)

Venues.propTypes = {
  children: PropTypes.node,
  bgImg: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  catering: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string)
}

const VenueCard = styled(Venues)`
padding-left: 10px;
padding-right: 10px;
padding: 20px 10px;

width: 100%;
background-color: transparent;

.card-title {
  padding: 0 5px;
  margin-bottom: 5px;
}
`
export default VenueCard
