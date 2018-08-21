import {
  Container,
  FormGroup,
  Input,
  Label,
  Button,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Col
} from 'reactstrap'
import ReactLoading from 'react-loading'

import Center from './Center'
import req from '../request'
import { inObser } from '../store/utils'

const Section = styled.section`
  margin: 2em 0;
`

class CategoriesView extends React.Component {
  state = {
    catName: ''
  }
  render () {
    return (
      <Container fluid>
        <h1 className='my-4'>Categories</h1>
        <Jumbotron className='form'>
          <Col sm='6'>
            <h1>Add a new category</h1>
            <FormGroup>
              <Label for='cat'>Category name:</Label>
              <Input
                name='cat'
                id='cat'
                value={this.state.catName}
                onChange={e =>
                  this.setState({ catName: e.currentTarget.value })}
              />
            </FormGroup>
            <Button
              onClick={e => {
                e.preventDefault()
                this.setState(p => {
                  this.props.onAdd(p.catName)
                  return { catName: '' }
                })
              }}
            >
              Add
            </Button>
          </Col>
        </Jumbotron>
        <Section>
          <h3>Existing Categories</h3>
          <ListGroup>
            {this.props.tags.map(t => (
              <ListGroupItem
                key={t._id}
                className='d-flex justify-content-between align-items-center'
              >
                <span>{t.name}</span>
                <Button color='danger' onClick={this.props.deleteRecord(t._id)}>
                  Delete
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
          <p className='text-muted'>
            {this.props.tags.length < 1 &&
              'No existing categories, please add some!'}
          </p>
        </Section>
      </Container>
    )
  }

  static propTypes = {
    onAdd: PropTypes.func,
    deleteRecord: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.object)
  }
}

class Categories extends React.Component {
  state = {
    categories: undefined
  }

  render () {
    return this.state.categories
      ? <CategoriesView
        tags={[].concat(this.state.categories)}
        onAdd={this.addCategory}
        deleteRecord={this.deleteById}
      />
      : <Center><ReactLoading type='spin' color='#373a3c' /></Center>
  }

  componentDidMount () {
    this.updateData()
  }

  updateData = () => {
    req
      .url('/tags')
      .get()
      .json(({ categories }) => this.setState({ categories }))
      .catch(_ => this.props.ui.auth.showModal())
  }

  addCategory = name =>
    req.url('/tags').json({ name }).post().json(res => this.updateData())

  deleteById = id => e => {
    req.url('/tags').json({ id }).delete().json(res => this.updateData())
  }

  static propTypes = {
    ui: PropTypes.object
  }
}

export default inObser(['ui'], Categories)
