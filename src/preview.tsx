import React, { useRef } from 'react'

import { Icon } from '@iconify/react'
import { Button, Upload, message } from 'antd'

import { useAppStore } from '@/store'

import PreviewTemplate from './components/PreviewBlock/Template'
import useDarkMode from './hooks/useDarkMode'
import { useResumeStore } from './store/resume'
import { useResumeStyleStore } from './store/style'
import { downloadJSON } from './utils'

import type { UploadProps } from 'antd'

const Preview = () => {
  const {
    previewMode, setPreviewMode, setShowEdit, setShowEditStyle,
  } = useAppStore()
  const [darkMode, setDarkMode] = useDarkMode()
  const { resumeData } = useResumeStore()
  const { resumeStyle } = useResumeStyleStore()
  const previewEl = useRef<HTMLDivElement>(null)

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

  // const exportPdf = () => {
  //   if (previewEl) {
  //     const pdf = new JsPDF()
  //     // pdf.html(previewEl.current!, {
  //     pdf.html(document.querySelector('.preview-container')!, {
  //       callback() {
  //         pdf.save('outpub.pdf')
  //       },
  //     })
  //   }
  // }

  const exportPdf = () => {

  }

  const importResumeData = (data: string) => {

  }

  return (
    <>
      {
        previewMode
          ? (
            <div
              className="preview-toggler fixed right-4 top-4 cursor-pointer opacity-0"
              role="presentation"
              onClick={() => setPreviewMode(false)}
            >
              <Icon icon="zondicons:close-outline" width={40} />
            </div>
          )
          : (
            <div
              className="flex justify-end p-2 text-white mb-8"
              style={{ backgroundColor: resumeStyle.themeColor }}
            >
              <span
                role="presentation"
                className="ml-4 text-xs cursor-pointer"
                onClick={() => setPreviewMode(true)}
              >
                预览
              </span>

              <span
                className="ml-4 flex items-center cursor-pointer hover:fill-true-gray-700"
                onClick={() => setDarkMode(!darkMode)}
                role="presentation"
              >
                <Icon icon={darkMode ? 'ic:outline-dark-mode' : 'ic:outline-light-mode'} />
              </span>
            </div>
          )
      }

      <div
        className="preview-container relative"
        style={{
          padding: resumeStyle.blockPadding,
          boxShadow: previewMode ? 'none' : '0 0 3px rgba(0,0,0,.3)',
        }}
      >
        {!previewMode
          ? (
            <div className="absolute flex flex-col justify-center right-full mr-4">
              <Button size="small" onClick={() => setShowEdit(true)}>编辑内容</Button>
              <Button size="small" className="mt-4" onClick={() => setShowEditStyle(true)}>编辑样式</Button>
              <Button
                size="small"
                className="mt-4"
                onClick={() => downloadJSON('resume-setting.json', {
                  resumeData,
                  resumeStyle,
                })}
              >导出配置
              </Button>
              <Upload {...uploadProps}>
                <Button
                  size="small"
                  className="mt-4"
                  onClick={() => downloadJSON('resume-setting.json', {
                    resumeData,
                    resumeStyle,
                  })}
                >
                  导入配置
                </Button>
              </Upload>
              <Button size="small" type="primary" className="mt-4" onClick={exportPdf}>导出PDF</Button>
            </div>
          )
          : null}
        <div ref={previewEl}>
          {
            resumeData.map((resume, i) => (
              <PreviewTemplate
                key={i}
                {...resume}
              />

            ))
          }
        </div>
      </div>
    </>
  )
}

export default Preview
