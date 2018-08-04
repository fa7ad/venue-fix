import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rodal from 'rodal'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import { convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToMarkdown from 'draftjs-to-markdown'
import { IoMdCreate } from 'react-icons/io'
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

const TipsEditor = ({ visible, onClose, onDone, onEdit }) => (
  <StyRodal animation='fade' visible={visible} onClose={onClose}>
    <h1 className='text-primary'>Add Tip</h1>
    <Editor
      wrapperClassName={addTipsWrapper}
      editorClassName={addTipsEditor}
      onEditorStateChange={onEdit}
    />
    <div className='py-2'>
      <Button
        color='danger'
        onClick={e => {
          onDone(e).then(e => onClose())
        }}
      >
        Add
      </Button>
      <Button color='primary' onClick={onClose}>Close</Button>
    </div>
  </StyRodal>
)

TipsEditor.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

class ManageTips extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    editor: false
  }

  render () {
    return (
      <div className='px-1'>
        <h2 className='py-2 border-bottom'>Tips</h2>

        <TipsEditor
          visible={this.state.editor}
          onClose={this.editorClose}
          onEdit={this.editorChange}
          onDone={async e => console.log(this.editorToMd())}
        />
        <Button onClick={e => this.setState({ editor: true })}>
          <IoMdCreate />&nbsp;New
        </Button>
      </div>
    )
  }

  editorChange = editorState => this.setState({ editorState })

  editorClose = e => this.setState({ editor: false })

  editorToMd = () => {
    const { editorState } = this.state

    const md =
      editorState &&
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()))

    return md
  }
}

export default ManageTips
