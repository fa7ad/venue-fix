import striptags from 'striptags'
import { struct } from 'superstruct'
import {
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap'

import { inObser } from '../store/utils'
import req from '../request'

const toText = function (html) {
  const text = striptags(html)
  return text
    .split(' ')
    .slice(0, 25)
    .join(' ')
}

const Root = styled.div`
  background-color: #eee;

  margin-top: 4em;
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  .container {
    flex-grow: 1;
  }
`

const isTip = struct({
  heading: 'string',
  time: 'string',
  body: 'string'
})

const Tip = ({ img, heading, time, body, onActivate, ...p }) => (
  <Card className={p.className}>
    {img && <CardImg top width='100%' src={img} />}
    <CardBody>
      <CardTitle>{heading}</CardTitle>
      <CardSubtitle>
        {time}
      </CardSubtitle>
      <CardText className='text-muted'>{toText(body)}</CardText>
      <Button onClick={e => onActivate({ heading, time, body })}>
        See more
      </Button>
    </CardBody>
  </Card>
)

Tip.propTypes = {
  img: PropTypes.string,
  heading: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onActivate: PropTypes.func
}

const TipCard = styled(Tip)`
  margin: 8px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 1rem;
  }
`

class TipsPage extends React.Component {
  state = {
    tips: []
  }

  render () {
    return (
      <Root>
        <Container>
          {this.state.tips.map((data, idx) => (
            <TipCard key={idx} {...data} onActivate={this.activateModal} />
          ))}
        </Container>
      </Root>
    )
  }

  componentDidMount () {
    req
      .url('/stips')
      .get()
      .json(({ tips }) => this.setState({ tips }))
      .catch(console.error)
  }

  activateModal = tip => {
    const { ui } = this.props
    ui.tip.activate(tip).then(success => {
      success && ui.tip.show()
    })
  }

  static propTypes = {
    ui: PropTypes.object.isRequired
  }
}

export { isTip, TipCard }

export default inObser(['ui'], TipsPage)
