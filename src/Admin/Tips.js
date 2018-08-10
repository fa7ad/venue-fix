import Rodal from 'rodal'
import { Button, Row, Container } from 'reactstrap'
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import { IoMdCreate } from 'react-icons/io'

import { tips } from '../Tips/index'

import { addTipsEditor, addTipsWrapper } from './Tips.module.css'
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
  onDone,
  onEdit,
  state,
  updating,
  onUpdate
}) => (
  <StyRodal animation='fade' visible={visible} onClose={onClose}>
    <h1 className='text-primary'>Add Tip</h1>
    {visible &&
      <Editor
        editorState={state}
        wrapperClassName={addTipsWrapper}
        editorClassName={addTipsEditor}
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
          },
          fontFamily: {
            className: 'd-none'
          },
          fontSize: {
            className: 'd-none'
          }
        }}
      />}
    <div className='py-2'>
      {updating
        ? <Button
          color='warning'
          onClick={e => onUpdate(updating).then(onClose)}
        >
            Update
        </Button>
        : <Button color='danger' onClick={e => onDone(e).then(onClose)}>
            Add
        </Button>}
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
  state: PropTypes.object,
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
    updating: false
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
          onDone={async e => console.log(this.editorToMd())}
          onUpdate={async id => console.log(id, this.editorToMd())}
          updating={this.state.updating}
        />
        <Container fluid>
          {tips.map((data, idx) => (
            <Row key={idx}>
              <strong>{data.time.toLocaleString()}</strong>
              {data.heading}
              <Button
                onClick={e =>
                  this.mdToEditor(data.body).then(e =>
                    this.setState({ editor: true, updating: idx })
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

  editorToMd = () => {
    const { editorState } = this.state

    const md =
      editorState &&
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()))

    return md
  }

  mdToEditor = async md => {
    const raw = markdownToDraft(md)
    const content = convertFromRaw(raw)
    this.setState({ editorState: EditorState.createWithContent(content) })
  }
}

export default ManageTips
