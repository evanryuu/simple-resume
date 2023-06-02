import React from 'react'

import { Button, Upload, message } from 'antd'

import { useAppStore } from '@/store'

import PreviewTemplate from './components/PreviewBlock/Template'
import { useResumeStore } from './store/resume'
import { useResumeStyleStore } from './store/style'
import { downloadJSON } from './utils'

import type { UploadProps } from 'antd'

const Preview = () => {
  const { setPreviewMode, setShowEdit, setShowEditStyle } = useAppStore()
  const { resumeData } = useResumeStore()
  const { resumeStyle } = useResumeStyleStore()

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      // URL.createObjectURL(info.file)
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const importResumeData = (data: string) => {

  }

  return (
    <>
      <div
        className="flex justify-center p-2"
        style={{ backgroundColor: resumeStyle.themeColor }}
      >
        <Button size="small" onClick={() => setShowEdit(true)}>编辑内容</Button>
        <Button size="small" className="ml-4" onClick={() => setShowEditStyle(true)}>编辑样式</Button>
        <Button size="small" className="ml-4" onClick={() => setPreviewMode(true)}>预览</Button>
        <Button
          size="small"
          className="ml-4"
          onClick={() => downloadJSON('resume-setting.json', {
            resumeData,
            resumeStyle,
          })}
        >导出配置
        </Button>
        <Upload {...uploadProps}>
          <Button
            size="small"
            className="ml-4"
            onClick={() => downloadJSON('resume-setting.json', {
              resumeData,
              resumeStyle,
            })}
          >
            导入配置
          </Button>
        </Upload>
      </div>
      <div
        className="preview-container"
        style={{
          padding: resumeStyle.blockPadding,
        }}
      >
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
