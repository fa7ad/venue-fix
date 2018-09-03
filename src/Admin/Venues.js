import ImgUp from 'react-images-upload'
import ReactLoading from 'react-loading'
import Select from 'react-select'
import {
  Container,
  Jumbotron,
  FormGroup,
  Input,
  Label,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

import Center from './Center'
import req from '../request'

const Section = styled.section`
  margin: 2em 0;
`

const ImageUp = styled(ImgUp)`
  .fileContainer {
    &,
    .chooseFileButton {
      border-radius: 0;
    }
  }
`

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const FormInput = ({ type, name, label, ctx, required, ...p }) => (
  <FormGroup>
    <Label htmlFor={name}>
      {label} <span className='text-danger'>*</span>
    </Label>
    <Input
      {...p}
      id={name}
      name={name}
      onChange={e => {
        if (type === 'checkbox') {
          return ctx.setState({ [name]: e.currentTarget.checked })
        }
        ctx.setState({ [name]: e.currentTarget.value })
      }}
      {...(type === 'checkbox'
        ? {
          checked: ctx.state[name],
          style: {
            ...p.style,
            position: 'relative',
            left: '2em',
            top: 5
          }
        }
        : {
          value: ctx.state[name]
        })}
      required={required}
      type={type || 'text'}
    />
  </FormGroup>
)

FormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'textarea', 'checkbox']),
  name: PropTypes.string,
  label: PropTypes.string,
  ctx: PropTypes.object,
  required: PropTypes.bool
}

class VenuesView extends React.Component {
  state = {
    image: [],
    title: '',
    capacity: 100,
    description: '',
    catering: false,
    categories: [],
    location: '',
    rent: 2000
  }

  render () {
    return (
      <Container fluid>
        <h1 className='my-4'>Venues</h1>
        <Jumbotron>
          <Col sm='6'>
            <h1>Add Venue</h1>
            <ImageUp
              withPreview
              singleImage
              buttonText='Choose image'
              onChange={this.onImgDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={2.1 * 1024 ** 2}
              label='Max file size: 2mb, accepted: jpg'
            />
            <FormInput name='title' label='Title' ctx={this} required />
            <FormInput
              name='description'
              label='Description'
              type='textarea'
              ctx={this}
              required
            />
            <FormInput
              name='location'
              label='Location'
              type='text'
              ctx={this}
              required
            />
            <FormInput
              name='capacity'
              label='Capacity'
              type='number'
              ctx={this}
              required
            />
            <FormInput
              name='catering'
              label='Catering'
              type='checkbox'
              ctx={this}
              required
            />
            <FormGroup>
              <Label>
                Catergories <span className='text-danger'>*</span>
              </Label>
              <Select
                defaultValue={this.state.categories}
                isMulti
                name='categories'
                options={this.props.categories}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={cats => {
                  const categories = cats.map(c => c.value)
                  this.setState({ categories })
                }}
              />
            </FormGroup>
            <FormInput
              name='rent'
              label='Rent Amount'
              type='number'
              min={2000}
              step={500}
              ctx={this}
              required
            />
            <Button color='danger' onClick={this.submitForm}>
              Add
            </Button>
          </Col>
        </Jumbotron>
        <Section>
          <h3>Existing Venues</h3>
          <ListGroup>
            {this.props.venues.map(v => (
              <ListGroupItem
                key={v._id}
                className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-between align-items-start'>
                  <img
                    src={v.image}
                    alt={'Picture of' + v.title}
                    height={24}
                    width={24}
                    className='mx-1'
                  />
                  <div className='mx-1'>
                    <strong>{v.title}</strong>
                    <br />
                    <span className='text-muted'>{v.location}</span>{' '}
                    <em>BDT {v.rent}</em>
                  </div>
                  <span className='text-muted mx-1'>{v.description}</span>
                  <span className='text-info mx-1'>
                    <div>Catering: {'' + v.catering}</div>
                    <div>{v.categories.join(', ')}</div>
                  </span>
                </div>
                <Button color='danger' onClick={this.props.deleteRecord(v._id)}>
                  Delete
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
          <p className='text-muted'>
            {this.props.venues.length < 1 &&
              'No existing venues, please add some!'}
          </p>
        </Section>
      </Container>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })

  onImgDrop = image => this.setState({ image })

  submitForm = e => {
    e.preventDefault()
    const [image] = this.state.image
    if (!image) return
    getBase64(image)
      .then(image => Object.assign({}, this.state, { image }))
      .then(formData => this.props.submitRecord(formData))
      .then(_ => {
        this.setState({
          image: [],
          title: '',
          capacity: 100,
          description: '',
          location: '',
          catering: false,
          categories: [],
          rent: 2000
        })
      })
  }

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    venues: PropTypes.arrayOf(PropTypes.object),
    deleteRecord: PropTypes.func,
    submitRecord: PropTypes.func
  }
}

class VenuesPage extends React.Component {
  state = {
    venues: [],
    categories: []
  }

  render () {
    return this.state.venues ? (
      <VenuesView
        {...this.state}
        submitRecord={this.submitRecord}
        deleteRecord={this.deleteRecord}
      />
    ) : (
      <Center>
        <ReactLoading color='#373a3c' type='spin' />
      </Center>
    )
  }

  componentDidMount () {
    req
      .url('/tags')
      .get()
      .json(({ categories }) =>
        categories.map(c => ({ label: c.name, value: c.name }))
      )
      .then(categories => this.setState({ categories }))
      .catch(_ => this.props.ui.auth.showModal())
    this.updateVenues()
  }

  updateVenues = () =>
    req
      .url('/venues')
      .get()
      .json(({ venues }) => this.setState({ venues }))
      .catch(_ => this.props.ui.auth.showModal())

  submitRecord = record => {
    req
      .url('/venues')
      .json(record)
      .post()
      .json(({ success }) => {
        console.log('success', success)
        this.updateVenues()
      })
  }

  deleteRecord = id => e => {
    req
      .url('/venues')
      .json({ id })
      .delete()
      .json(({ success }) => {
        console.log('delete', success)
        this.updateVenues()
      })
  }

  static propTypes = {
    ui: PropTypes.object
  }
}

export default VenuesPage
