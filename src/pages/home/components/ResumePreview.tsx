import PreviewTemplate from '@/components/PreviewTemplate/Template'
import { useAppStore, useResumeStore } from '@/store'

export interface ResumePreviewProps {
  previewParent: React.RefObject<HTMLDivElement>
  previewEl: React.RefObject<HTMLDivElement>
}

export const ResumePreview: React.FC<ResumePreviewProps> = (props) => {
  const { previewMode } = useAppStore()
  const { resumeData, resumeStyle } = useResumeStore()

  return (
    <div
      ref={props.previewParent}
      className="preview-container h-full flex justify-center items-center relative mb-16"
    >
      <div
        id="preview-target"
        style={{
    padding: resumeStyle.pagePadding.value,
    boxShadow: previewMode ? 'none' : '0 0 3px rgba(0,0,0,.3)',
  }}
      >
        <div ref={props.previewEl} className="bg-white">
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
    </div>
  )
}
