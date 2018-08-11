import Rodal from 'rodal'
import { Button, Row, Container, Input } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertFromHTML, convertToHTML } from 'draft-convert'
import { IoMdCreate } from 'react-icons/io'

import { tips } from '../Tips/index'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const StyRodal = styled(Rodal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1080;

  .rodal-dialog {
    left: auto;
    right: auto;
    width: 90vw !important;
    height: auto !important;
    z-index: 1081;
    margin: 5px auto;
    overflow-y: scroll;
  }
`

const TipsEditor = ({
  visible,
  onClose,
  onEdit,
  state,
  updating,
  heading,
  onHeadingChange,
  ...p
}) => (
  <StyRodal animation='fade' visible={visible} onClose={onClose}>
    <h1 className='text-primary'>Add Tip</h1>
    <Input
      className='my-2'
      placeholder='Heading'
      required
      onChange={onHeadingChange}
      value={heading}
    />
    {visible &&
      <Editor
        editorState={state}
        wrapperClassName='bg-white'
        editorClassName='bg-light'
        onEditorStateChange={onEdit}
        toolbar={{
          image: {
            uploadCallback: file =>
              new Promise((resolve, reject) => {
                const reader = new window.FileReader()
                reader.onload = e =>
                  resolve({ data: { link: e.target.result } })
                reader.onerror = e => reject(e)
                reader.readAsDataURL(file)
              })
          }
        }}
      />}
    <div className='py-2'>
      <Button
        color={updating ? 'warning' : 'danger'}
        onClick={e =>
          p[updating ? 'onUpdate' : 'onDone'](updating).then(onClose)}
        children={updating ? 'Update' : 'Add'}
      />
      <Button color='primary' onClick={onClose}>Close</Button>
    </div>
  </StyRodal>
)

TipsEditor.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onHeadingChange: PropTypes.func.isRequired,
  state: PropTypes.object,
  heading: PropTypes.string,
  updating: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

class ManageTips extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    editor: false,
    updating: false,
    heading: 'New Tip'
  }

  render () {
    return (
      <div className='px-2'>
        <h2 className='py-2 border-bottom'>Tips</h2>
        <Button onClick={e => this.setState({ editor: true })}>
          <IoMdCreate />&nbsp;New Tip
        </Button>
        <TipsEditor
          state={this.state.editorState}
          visible={this.state.editor}
          onClose={this.editorClose}
          onEdit={this.editorChange}
          heading={this.state.heading}
          onDone={async e =>
            console.log(this.state.heading, this.editorToHTML())}
          onUpdate={async id => console.log(this.state.heading, this.editorToHTML())}
          updating={this.state.updating}
          onHeadingChange={e => this.setState({heading: e.currentTarget.value})}
        />
        <Container fluid>
          {tips.map((data, idx) => (
            <Row key={idx}>
              <strong>{data.time.toLocaleString()}</strong>
              {data.heading}
              <Button
                onClick={e =>
                  this.markupToEditor(data.body).then(e =>
                    this.setState({
                      editor: true,
                      updating: 'item_' + idx,
                      heading: data.heading
                    })
                  )}
              >
                Edit
              </Button>
              <Button>Delete</Button>
            </Row>
          ))}
        </Container>
      </div>
    )
  }

  editorChange = editorState => this.setState({ editorState })

  editorClose = e =>
    this.setState({
      editor: false,
      updating: false,
      editorState: EditorState.createEmpty()
    })

  editorToHTML = () => {
    const { editorState } = this.state

    return editorState && convertToHTML(editorState.getCurrentContent())
  }

  markupToEditor = async html => {
    this.setState({
      editorState: EditorState.createWithContent(convertFromHTML(html))
    })
  }
}

export default ManageTips
