import React, { createContext, useMemo, useRef } from 'react'

import { usePrint } from '@/hooks'
import { useAppStore } from '@/store'

import Footer from './components/Footer'
import Header from './components/Header'

import type { BaseComponentProps } from '@/types'

import PreviewTemplate from '../../components/PreviewTemplate/Template'
import { useResumeStore } from '../../store/resume'

export interface IPreviewContext {
  previewRef: React.RefObject<any>
  printResume: () => void
}

export const PreviewContext = createContext<IPreviewContext>({} as IPreviewContext)

const ComponentToPrint: React.FC<BaseComponentProps> = React.forwardRef((props, ref: any) => (
  <div ref={ref}>
    {props.children}
  </div>
))

const Preview = () => {
  const { previewMode } = useAppStore()
  const {
    resumeStyle,
    resumeData,
  } = useResumeStore()

  const previewEl = useRef<HTMLDivElement>(null)

  const { print } = usePrint(previewEl)

  const ctxValue = useMemo(() => ({
    printResume: print,
    previewRef: previewEl,
  }), [resumeData])

  return (
    <PreviewContext.Provider value={ctxValue}>
      <Header />

      {/* S Preview */}
      <div className="preview-container relative mb-16">
        <div
          style={{
            marginTop: previewMode ? 0 : 72,
            padding: resumeStyle.pagePadding.value,
            boxShadow: previewMode ? 'none' : '0 0 3px rgba(0,0,0,.3)',
            marginBottom: previewMode ? 0 : 20,
          }}
        >
          <ComponentToPrint>
            <div id="print-target" ref={previewEl}>
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
      {/* E Preview */}

      <Footer />
    </PreviewContext.Provider>
  )
}

export default Preview
