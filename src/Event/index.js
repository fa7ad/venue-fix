import qs from 'qs'
import cx from 'classnames'
import { map, toLower } from 'ramda'
import { renameKeys, isArray, isString } from 'ramda-adjunct'

import { Row, Container } from 'reactstrap'
import ReactLoading from 'react-loading'

import EventForm from './EventForm'
import VenueCard from './Venues'

import req from '../request'
import { inject, observer } from 'mobx-react'

const Root = styled.div.attrs(p => ({
  className: cx('root', p.className)
}))`
  margin-top: 64px;
`

const venueCardProps = {
  image: 'bgImg',
  categories: 'tags',
  _id: 'id',
  rent: 'price',
  description: 'children'
}

const safeLower = val => (isString(val) ? toLower(val) : val)
const mapLower = map(el => (isArray(el) ? mapLower(el) : safeLower(el)))

class Event extends React.Component {
  state = {
    form: {},
    tags: undefined,
    locations: undefined,
    venues: undefined
  }

  render () {
    const { location, ui } = this.props
    const { tags, locations, venues } = this.state

    return tags && locations && venues ? (
      <Root>
        <EventForm
          initialData={qs.parse(location.search.slice(1) || '')}
          onChange={ui.form.set}
          tags={tags}
          locations={locations}
        />
        <Container>
          <Row style={{ minHeight: '50vh' }}>
            {this.filterWithForm(ui.form.get(), venues).map(venue => (
              <VenueCard
                {...renameKeys(venueCardProps, venue)}
                key={venue._id}
                onBook={this.bookVenue}
              />
            ))}
          </Row>
        </Container>
      </Root>
    ) : (
      <ReactLoading type='spin' color='#373a3c' />
    )
  }

  filterWithForm = (form, data) => {
    const { location, guests, category, catering, budget } = form
    return [...data].filter(function (x) {
      const v = mapLower(x)
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
      .json(({ venues }) => this.setState({ venues: [].concat(venues) }))
      .catch(e => console.error(e))
  }

  bookVenue = id => {
    console.log(id)
  }

  static propTypes = {
    location: PropTypes.object,
    ui: PropTypes.object
  }
}

export default inject('ui')(observer(Event))
