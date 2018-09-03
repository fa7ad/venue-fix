import qs from 'qs'
import cx from 'classnames'

import { map, toLower } from 'ramda'

import { Row, Container } from 'reactstrap'

import EventForm from './EventForm'
import VenueCard from './Venues'

import req from '../request'
import { inObser } from '../store/utils'

const Root = styled.div.attrs({
  className: p => cx('root', p.className)
})`
  margin-top: 64px;
`

class Event extends React.Component {
  state = {
    form: {},
    tags: [],
    locations: [],
    venues: []
  }

  render () {
    const { location, ui } = this.props
    return (
      <Root>
        <EventForm
          initialData={qs.parse(location.search.slice(1) || '')}
          onChange={ui.form.set}
          tags={this.state.tags}
          locations={this.state.locations}
        />
        <Container>
          <Row style={{ minHeight: '50vh' }}>
            {this.filterWithForm(ui.form, this.state.venues).map(ven => (
              <VenueCard
                bgImg={ven.image}
                tags={ven.categories}
                key={ven._id}
                price={ven.rent}
                location={ven.location}
                catering={ven.catering}
                capacity={ven.capacity}>
                {ven.details}
              </VenueCard>
            ))}
          </Row>
        </Container>
      </Root>
    )
  }

  filterWithForm = (form, data) => {
    const { location, guests, category, catering, budget } = form
    return [].concat(data).filter(x => {
      const v = map(y => (typeof y === 'string' ? toLower(y) : y), x)
      v.categories = map(toLower, v.categories)

      return (
        location === v.location &&
        v.rent <= budget[1] &&
        v.rent >= budget[0] &&
        (catering ? v.catering === true : true) &&
        v.categories.indexOf(category.trim()) !== -1 &&
        guests <= v.capacity
      )
    })
  }

  componentDidMount () {
    req
      .url('/tags')
      .get()
      .json(({ categories: tags }) => this.setState({ tags }))
      .catch(e => console.error(e))
    req
      .url('/locations')
      .get()
      .json(({ locations }) => this.setState({ locations }))
      .catch(e => console.error(e))
    req
      .url('/venues')
      .get()
      .json(({ venues }) => this.setState({ venues }))
      .catch(e => console.error(e))
  }

  static propTypes = {
    location: PropTypes.object,
    ui: PropTypes.object
  }
}
export default inObser(['ui'], Event)
