import React, { useRef } from 'react'

import { Icon } from '@iconify/react'
import { Button, Upload, message } from 'antd'

import { useAppStore } from '@/store'

import PreviewTemplate from './components/PreviewBlock/Template'
import useDarkMode from './hooks/useDarkMode'
import { useResumeStore } from './store/resume'
import { downloadJSON } from './utils'

import type { IResumeStorage } from './utils/initTemplateData'

const Preview = () => {
  const {
    previewMode, setPreviewMode, setShowEdit, setShowEditStyle,
  } = useAppStore()
  const [darkMode, setDarkMode] = useDarkMode()
  const {
    resumeStyle, resumeData, setResumeData, setResumeStyle,
  } = useResumeStore()
  const previewEl = useRef<HTMLDivElement>(null)
  const fileInputEl = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          const fileContent = e.target.result as string
          const jsonData = JSON.parse(fileContent) as IResumeStorage
          setResumeData(jsonData.state.resumeData)
          setResumeStyle(jsonData.state.resumeStyle)
        }
      }
      reader.readAsText(file)
    }
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
          marginBottom: previewMode ? 0 : 20,
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
                  state: {
                    resumeData,
                    resumeStyle,
                  },
                })}
              >导出配置
              </Button>
              <Button
                size="small"
                className="mt-4"
                onClick={() => fileInputEl.current?.click()}
              >
                导入配置
                <input
                  ref={fileInputEl}
                  className="hidden"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                />
              </Button>
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
