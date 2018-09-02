import { DateTime } from 'luxon'
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

const toText = function (html) {
  const text = striptags(html)
  return text.split(' ').slice(0, 25).join(' ')
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
  img: 'string?',
  heading: 'string',
  time: 'date',
  body: 'string'
})

const Tip = ({ img, heading, time, body, onActivate, ...p }) => (
  <Card className={p.className}>
    {img && <CardImg top width='100%' src={img} />}
    <CardBody>
      <CardTitle>{heading}</CardTitle>
      <CardSubtitle>
        {DateTime.fromJSDate(time).toLocaleString(DateTime.DATE_MED)}
      </CardSubtitle>
      <CardText className='text-muted'>
        {toText(body)}
      </CardText>
      <Button onClick={e => onActivate({ img, heading, time, body })}>
        See more
      </Button>
    </CardBody>
  </Card>
)

Tip.propTypes = {
  img: PropTypes.string,
  heading: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
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
  // sample data
  static tips = [
    {
      heading: 'Hello World',
      time: new Date(),
      body: `
hello <b>World</b>
![](https://woothosting.com/assets/images/logo.png)
`
    },
    {
      heading: 'Hello React',
      time: new Date('7/12/2018 12:15 AM'),
      body: `
<h1>hello react</h1>
<h2>hi, vue</h2>
<h3>bye, angular</h3>
`
    }
  ]

  render () {
    return (
      <Root>
        <Container>
          {TipsPage.tips
            .filter(isTip.test)
            .map((data, idx) => (
              <TipCard key={idx} {...data} onActivate={this.activateModal} />
            ))}
        </Container>
      </Root>
    )
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

const { tips } = TipsPage
export { tips, isTip, TipCard }

export default inObser(['ui'], TipsPage)
