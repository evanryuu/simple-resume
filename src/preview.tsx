import React, { useRef, useState } from 'react'

import { Icon } from '@iconify/react'
import { Button, Modal, message } from 'antd'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'

import { useAppStore } from '@/store'

import DarkModeSwitcher from './components/DarkModeSwitcher'
import LanguageSelect from './components/LanguageSelect'
import PreviewSwitcher from './components/PreviewSwitcher'
import PreviewTemplate from './components/PreviewTemplate/Template'
import { useResumeStore } from './store/resume'
import { downloadJSON } from './utils'

import type { IResumeStorage } from './utils/initTemplateData'
import type { ButtonProps } from 'antd'

const ComponentToPrint: React.FC<{ children: React.ReactNode }> = (props) => (
  <div>
    {props.children}
  </div>
)

const PrintButton: React.FC<{
  contentRef: React.RefObject<any>
} & ButtonProps> = (props) => {
  const { contentRef, children, ...rest } = props
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
    @media print {
      @page {
        size: A4;
        orientation: portrait;
        -webkit-print-color-adjust: exact;
      }
    }
    `,
  })

  return <Button {...rest} onClick={handlePrint}>{children}</Button>
}

const Preview = () => {
  const [showConfirm, setShowConfirm] = useState(false)

  const { t } = useTranslation()
  const {
    previewMode, setPreviewMode, setShowEdit, setShowEditStyle,
  } = useAppStore()
  const {
    resumeStyle, resumeData, setResumeData, setResumeStyle, resetResumeSettings,
  } = useResumeStore()

  const previewEl = useRef<HTMLDivElement>(null)
  const fileInputEl = useRef<HTMLInputElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

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
          message.success('导入成功！')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleRecoverResumeData = () => {
    resetResumeSettings()
    message.success('重置成功！')
    setShowConfirm(false)
  }

  const exportPdf = () => {
    html2pdf().set({
      margin: resumeStyle.pagePadding.value / 4,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2.5 },
      pagebreak: { avoid: 'span ' },
    }).from(previewEl.current).save('nihaoya.pdf')
  }

  return (
    <>
      <Modal
        open={showConfirm}
        onOk={handleRecoverResumeData}
        title="Confirm"
        onCancel={() => setShowConfirm(false)}
      >
        确认恢复默认配置吗？
      </Modal>
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
              style={{ backgroundColor: resumeStyle.themeColor.value }}
            >

              <PreviewSwitcher className="ml-4 text-xs cursor-pointer flex items-center" />
              <DarkModeSwitcher className="ml-4 flex items-center cursor-pointer hover:fill-true-gray-700" />
              <LanguageSelect placement="bottomRight" className="flex items-center ml-4" />
            </div>
          )
      }

      <div
        className="preview-container relative"
      >
        {!previewMode
          ? (
            <div className="absolute flex flex-col justify-center right-full mr-4">
              <Button size="small" onClick={() => setShowEdit(true)}>{t('editContent')}</Button>
              <Button size="small" className="mt-4" onClick={() => setShowEditStyle(true)}>{t('editStyle')}</Button>
              <Button
                size="small"
                className="mt-4"
                onClick={() => downloadJSON('resume-setting.json', {
                  state: {
                    resumeData,
                    resumeStyle,
                  },
                })}
              >{t('exportConfig')}
              </Button>
              <Button
                size="small"
                className="mt-4"
                onClick={() => fileInputEl.current?.click()}
              >
                {t('importConfig')}
                <input
                  ref={fileInputEl}
                  className="hidden"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                />
              </Button>
              <Button size="small" className="mt-4" onClick={() => setShowConfirm(true)}>{t('resetConfig')}</Button>

              <Button size="small" className="mt-4" onClick={exportPdf}>{t('exportPicturePDF')}</Button>
              <PrintButton size="small" className="mt-4" type="primary" contentRef={componentRef}>{t('exportPDF')}</PrintButton>
            </div>
          )
          : null}
        <div
          style={{
            padding: resumeStyle.pagePadding.value,
            boxShadow: previewMode ? 'none' : '0 0 3px rgba(0,0,0,.3)',
            marginBottom: previewMode ? 0 : 20,
          }}
        >
          <ComponentToPrint>
            <div id="print-target" ref={componentRef}>
              {
                resumeData.map((resume, i) => (
                  <PreviewTemplate
                    key={i}
                    {...resume}
                  />
                ))
              }
            </div>
          </ComponentToPrint>
        </div>
      </div>
    </>
  )
}

export default Preview
