import React from 'react'

import { Button } from 'antd'

import { useAppStore } from '@/store'

import PreviewTemplate from './components/PreviewBlock/Template'
import { useResumeStore } from './store/resume'

const Preview = () => {
  const { setPreviewMode, setShowEdit } = useAppStore()
  const { resumeData } = useResumeStore()
  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => setShowEdit(true)}>编辑内容</Button>
        <Button className="ml-4" onClick={() => setShowEdit(true)}>编辑样式</Button>
        <Button className="ml-4" onClick={() => setPreviewMode(true)}>预览</Button>
      </div>
      <div className="preview-container">
        {
          resumeData.map((resume, i) => (
            <PreviewTemplate
              key={i}
              {...resume}
            />

          ))
        }
      </div>
    </>
  )
}

export default Preview
