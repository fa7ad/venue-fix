import ImgUp from 'react-images-upload'
import ReactLoading from 'react-loading'
import Select from 'react-select'
import { Container, Jumbotron, FormGroup, Input, Label, Col, Button } from 'reactstrap'

import Center from './Center'
import req from '../request'

const ImageUp = styled(ImgUp)`
  .fileContainer {
    &, .chooseFileButton{
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
    <Label htmlFor={name}>{label} <span className='text-danger'>*</span></Label>
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
    categories: []
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
              name='capacity'
              label='Capacity'
              type='number'
              min='100'
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
              <Label>Catergories <span className='text-danger'>*</span></Label>
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
            <Button color='danger' onClick={this.submitForm}>Add</Button>
          </Col>
        </Jumbotron>
      </Container>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })

  onImgDrop = image => this.setState({ image })

  submitForm = e => {
    e.preventDefault()

    const formData = Object.assign({}, this.state)
    getBase64(formData.image[0]).then(encoded => {
      formData.image = encoded
    })

    console.log(formData)
  }

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object)
  }
}

class VenuesPage extends React.Component {
  state = {
    venues: [],
    categories: []
  }

  render () {
    return this.state.venues
      ? <VenuesView {...this.state} />
      : <Center><ReactLoading color='#373a3c' type='spin' /></Center>
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
  }

  static propTypes = {
    ui: PropTypes.object
  }
}

export default VenuesPage
