import Rodal from 'rodal'

import sanitize from 'sanitize-html'
import MarkDown from 'remarkable'
import { Badge } from 'reactstrap'
import { DateTime } from 'luxon'
import { uiObserver } from '../uiStore'

const remarkable = new MarkDown({ html: true })
const sanitizeOptions = {
  allowedTags: sanitize.defaults.allowedTags.concat(['img', 'span']),
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    '*': ['style']
  }
}

const StyRodal = styled(Rodal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1080;

  .rodal-dialog {
    left: auto;
    right: auto;
    top: 1vh;
    min-height: 97vh;
    width: 90vw !important;
    z-index: 1081;
  }
`

const TextContent = styled.div`
  text-size: 0.8em;
`

const MdView = ({ source }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: sanitize(remarkable.render(source), sanitizeOptions)
    }}
  />
)
MdView.propTypes = {
  source: PropTypes.string.isRequired
}

const TipsModal = ({ ui, ...props }) => (
  <StyRodal animation='fade' visible={ui.tip.visible} onClose={ui.tip.hide}>
    <h1 className='text-primary'>{ui.tip.activeTip.heading}</h1>
    <Badge color='primary'>
      {DateTime.fromJSDate(ui.tip.activeTip.time).toLocaleString(
        DateTime.DATE_MED
      )}
    </Badge>
    <hr />
    <TextContent>
      <MdView source={ui.tip.activeTip.body} />
    </TextContent>
  </StyRodal>
)

TipsModal.propTypes = {
  ui: PropTypes.object.isRequired
}

export default uiObserver(TipsModal)
