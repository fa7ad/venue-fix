import qs from 'qs'
import cx from 'classnames'

import { Row, Container } from 'reactstrap'

import EventForm from './EventForm'
import VenueCard from './Venues'
import Footer from '../common/Footer'

import image1 from '../images/hotel.jpg'
import image2 from '../images/hotel2.jpg'
import { uiObserver } from '../uiStore'

const Root = styled.div.attrs({
  className: p => cx('root', p.className)
})`
  margin-top: 64px;
`

const testData = [
  {
    name: 'BICC',
    tags: ['Conference'],
    image: image1,
    details: 'this is a really crap venue',
    key: 'bicc-venue-001',
    price: 20000,
    location: 'dhaka',
    catering: true,
    capacity: 10000
  },
  {
    name: 'BBCC',
    tags: ['Meeting'],
    image: image2,
    details: 'this is a really good venue',
    key: 'bbcc-venue-002',
    price: 100000,
    location: 'chittagong',
    catering: false,
    capacity: 1000
  }
]

class Event extends React.Component {
  state = {
    form: {}
  }

  render () {
    const { location, ui } = this.props
    return (
      <Root>
        <EventForm
          initialData={qs.parse(location.search.slice(1) || '')}
          onChange={form => {
            ui.form.set(form)
          }}
        />
        <Container>
          <Row style={{ minHeight: '50vh' }}>
            {this.filterWithForm(ui.form, testData).map(ven => (
              <VenueCard
                bgImg={ven.image}
                tags={ven.tags}
                key={ven.key}
                price={ven.price}
                location={ven.location}
                catering={ven.catering}
                capacity={ven.capacity}
              >
                {ven.details}
              </VenueCard>
            ))}
          </Row>
        </Container>
        <Footer />
      </Root>
    )
  }

  filterWithForm = (form, data) => {
    const { location, guests, event, catering, budget } = form
    return data.filter(
      v =>
        location === v.location &&
        v.price <= budget[1] &&
        v.price >= budget[0] &&
        (catering ? v.catering === true : true) &&
        v.tags.map(x => x.toLowerCase()).indexOf(event) !== -1 &&
        guests <= v.capacity
    )
  }

  static propTypes = {
    location: PropTypes.object,
    ui: PropTypes.object
  }
}
export default uiObserver(Event)
