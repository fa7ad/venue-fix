import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap'

const Root = styled.div`
  margin-top: 10vh;

  flex-basis: 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

class ContactPage extends React.Component {
  state = {
    name: '',
    phone: '',
    email: '',
    message: ''
  }
  render () {
    return (
      <Root>
        <Container>
          <Container fluid>
            <h1>Please leave us a message</h1>
            <h3 className='py-2 border-bottom text-muted'>We will do our best to reach you back</h3>
          </Container>
          <Form
            action='https://formspree.io/venue.fix.contact@gmail.com'
            method='POST'
            className='col-sm-6 my-4'
          >
            <FormGroup>
              <Label for='name'>
                Name:
              </Label>
              <Input
                name='name'
                id='name'
                value={this.state.name}
                onChange={this.valChange('name')}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='phone'>
                Phone:
              </Label>
              <Input
                name='phone'
                id='phone'
                value={this.state.phone}
                onChange={this.valChange('phone')}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='email'>
                Email:
              </Label>
              <Input
                name='email'
                id='email'
                type='email'
                value={this.state.email}
                onChange={this.valChange('email')}
              />
            </FormGroup>
            <FormGroup>
              <Label for='message'>
                Message:
              </Label>
              <Input
                type='textarea'
                name='message'
                id='message'
                value={this.state.message}
                onChange={this.valChange('message')}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </Container>
      </Root>
    )
  }

  valChange = name => e => this.setState({ [name]: e.currentTarget.value })
}

export default ContactPage
