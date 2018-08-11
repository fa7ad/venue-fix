import { Row as Rw, Container } from 'reactstrap'

import image1 from '../images/hotel.jpg'
import image2 from '../images/hotel2.jpg'
import image3 from '../images/hotel3.jpg'
import PictureCard from './PictureCard'

const Root = styled.div`
  background-color: #fff;
  min-height: 65vh;
  display: flex;
  align-items: center
`

const Row = styled(Rw)`
  margin-left: -25px;
  margin-right: -25px;
`

const Header = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

class Category extends React.Component {
  render () {
    return (
      <Root>
        <Container>
          <Header>
            <h3>Featured Categories</h3>
          </Header>

          <Row>
            <PictureCard bgImg={image1} size='6' caption='Meetings'>
              Book a room
            </PictureCard>
            <PictureCard
              bgImg={image2}
              size='3'
              caption='Conferences'
              btn='danger'
            >
              Book a hall
            </PictureCard>
            <PictureCard bgImg={image3} size='3' caption='Weddings'>
              Book a venue
            </PictureCard>
          </Row>
        </Container>
      </Root>
    )
  }
}
export default Category
