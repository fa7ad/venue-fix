import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const AddTips = p => (
  <div>
    <Editor apiKey='API_KEY' init={{ plugins: 'link table' }} />
  </div>
)
export default AddTips
