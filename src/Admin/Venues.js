import ImgUp from 'react-images-upload'
import ReactLoading from 'react-loading'
import { Container, Jumbotron, FormGroup, Input, Label, Col } from 'reactstrap'
import Center from './Center'

const ImageUp = styled(ImgUp)`
  .fileContainer {
    &, .chooseFileButton{
      border-radius: 0;
    }
  }
`

// function getBase64 (file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = error => reject(error)
//   })
// }

class VenuesView extends React.Component {
  state = {
    image: [],
    title: '',
    capacity: 0
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
              imgExtension={['.jpg']}
              maxFileSize={2097152}
              label='Max file size: 2mb, accepted: jpg'
            />
            <FormGroup>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                onChange={this.valChange('title')}
                value={this.state.title}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='capacity'>Capacity</Label>
              <Input
                id='capacity'
                name='capacity'
                type='number'
                onChange={this.valChange('capacity')}
                value={this.state.capacity}
              />
            </FormGroup>
          </Col>
        </Jumbotron>
      </Container>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })

  onImgDrop = image => this.setState({ image })
}

class VenuesPage extends React.Component {
  state = {
    venues: []
  }

  render () {
    return this.state.venues
      ? <VenuesView venues={this.state.venues} />
      : <Center><ReactLoading color='#373a3c' type='spin' /></Center>
  }
}

export default VenuesPage
