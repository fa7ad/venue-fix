import { Card, CardTitle, CardImg, Col, Badge, Button } from 'reactstrap'
import cx from 'classnames'

const CardStyle = styled(Card)`
  img {
    min-height: 250px;
  }
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const Venues = ({
  children,
  bgImg,
  size,
  price,
  tags,
  capacity,
  catering,
  title,
  id,
  onBook,
  ...p
}) => (
  <Col sm={size || 3} {...p}>
    <CardStyle>
      <CardImg top width='100%' src={bgImg} />
      <CardTitle>
        <strong>{title}</strong>
        <br />
        {children}
        <br />
        <span className='text-muted'>{'\u09F3 ' + price}</span>
        <br />
        <div>
          {tags.map((tag, idx) => (
            <Badge color='primary' key={'cat-0' + idx} className='mr-1'>
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <Badge color='secondary'>Capacity: {capacity}</Badge>{' '}
          <Badge color={cx({ danger: !catering }, { success: catering })}>
            {catering ? 'Has ' : 'No '}
            Catering
          </Badge>
        </div>
        <div className='mt-2'>
          <Button color='info' onClick={e => onBook(id)}>Book</Button>
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
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  id: PropTypes.string,
  onBook: PropTypes.func
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
