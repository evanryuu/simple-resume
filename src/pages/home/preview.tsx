import React, {
  createContext, useMemo, useRef, useState,
} from 'react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import { usePrint } from '@/hooks'

import Footer from './components/Footer'
import Header from './components/Header'
import { ResumePreview } from './components/ResumePreview'

import { useResumeStore } from '../../store/resume'

import './preview.css'

export interface IPreviewContext {
  previewRef: React.RefObject<any>
  printResume: () => void
}
const ResumePreviewMemoized = React.memo(ResumePreview)

export const PreviewContext = createContext<IPreviewContext>({} as IPreviewContext)

const Preview: React.FC = () => {
  const [dragging, setDragging] = useState(false)

  const previewEl = useRef<HTMLDivElement>(null)
  const previewParent = useRef<HTMLDivElement>(null)

  const {
    resumeData,
  } = useResumeStore()

  const { print } = usePrint(previewEl)

  const ctxValue = useMemo(() => ({
    printResume: print,
    previewRef: previewEl,
  }), [resumeData])

  return (
    <PreviewContext.Provider value={ctxValue}>
      <Header />

      {/* S Preview */}
      <TransformWrapper
        smooth
        centerOnInit
        minScale={0.2}
        initialScale={1}
        limitToBounds={false}
        centerZoomedOut={false}
        doubleClick={{ disabled: true }}
        pinch={{ step: 1 }}
        wheel={{ step: 0.1 }}
        onPanningStart={() => setDragging(true)}
        onPanningStop={() => setDragging(false)}
      >
        <TransformComponent
          wrapperClass="!w-full !h-full !fixed overflow-visible"
          wrapperStyle={{
            backgroundImage: 'linear-gradient(to right, transparent 1px, #000 1px), linear-gradient(transparent 1px, #000 1px)',
            backgroundSize: '20px 20px',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
          contentClass="pt-4"
        >
          <ResumePreviewMemoized previewEl={previewEl} previewParent={previewParent} />
        </TransformComponent>
      </TransformWrapper>
      {/* E Preview */}

      <Footer />
    </PreviewContext.Provider>
  )
}

export default Preview
