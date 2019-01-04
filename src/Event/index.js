import qs from 'qs'
import cx from 'classnames'
import { map, toLower } from 'ramda'
import { renameKeys, isArray, isString } from 'ramda-adjunct'

import {
  Row,
  Container,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledAlert
} from 'reactstrap'
import Rodal from 'rodal'
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

const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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
    venues: undefined,
    modal: false,
    id: '',
    message: false,
    fmessage: 'Call me back'
  }

  render () {
    const { location, ui } = this.props
    const { tags, locations, venues } = this.state

    return tags && locations && venues ? (
      <Root>
        <Rodal visible={this.state.modal} onClose={this.hideModal}>
          <ModalContent>
            <h3>Leave a message (optional)</h3>
            {this.state.message && (
              <UncontrolledAlert>{this.state.message}</UncontrolledAlert>
            )}
            <InputGroup>
              <Input
                type='text'
                name='message'
                onChange={this.setMessage}
                value={this.state.fmessage}
              />
              <InputGroupAddon addonType='append'>
                <Button color='success' onClick={this.confirmBook}>
                  Confirm!
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ModalContent>
        </Rodal>
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

  hideModal = e => {
    this.setState({ modal: false })
  }

  setMessage = e => {
    this.setState({ fmessage: e.target.value })
  }

  filterWithForm = (form, data) => {
    const { location, guests, category, catering, budget } = form
    return [...data].filter(function (x) {
      const v = mapLower(x)
      console.log(location === v.location,
        v.rent <= budget[1],
        v.rent >= budget[0],
        (catering ? v.catering : true),
        v.categories.indexOf(category.trim()) !== -1,
        guests <= v.capacity)
      return (
        location === v.location &&
        v.rent <= budget[1] &&
        v.rent >= budget[0] &&
        (catering ? v.catering : true) &&
        v.categories.indexOf(category.trim()) !== -1 &&
        guests <= v.capacity
      )
    })
  }

  async componentDidMount () {
    try {
      const [t, l, v] = await Promise.all([
        req
          .url('/tags')
          .get()
          .json(),
        req
          .url('/locations')
          .get()
          .json(),
        req
          .url('/venues')
          .get()
          .json()
      ])
      const tags = t.categories
      const locations = l.locations
      const venues = v.venues
      this.setState({ tags, locations, venues })
    } catch (e) {
      console.error(e)
    }
  }

  bookVenue = id => {
    this.setState({ id, modal: true })
  }

  confirmBook = e => {
    req
      .url('/bookings')
      .json({
        ...this.props.ui.form,
        message: this.state.fmessage,
        venueid: this.state.id
      })
      .post()
      .unauthorized(e => {
        console.log(1)
        this.props.ui.auth.toLog()
        this.props.ui.auth.showModal()
      })
      .json(({ success }) => {
        if (success) {
          this.setState({ message: 'Venue booked successfully!' })
          setTimeout(_ => this.hideModal(), 1200)
        } else {
          throw new Error('Unauthorized')
        }
      })
  }

  static propTypes = {
    location: PropTypes.object,
    ui: PropTypes.object
  }
}

export default inject('ui')(observer(Event))
