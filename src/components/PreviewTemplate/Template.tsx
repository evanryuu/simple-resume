import React from 'react'

import BlockTemplate0 from './BlockTemplate-0'
import InfoTemplate0 from './InfoTemplate-0'

import type {
  IResumeBlock, IResumeBlockSetting, IResumeInfoSetting, TemplateType,
} from '@/store/resume'

export type DisplayTemplateProps = IResumeBlock
type TemplateMap = Record<TemplateType, JSX.Element>

const PreviewTemplate: React.FC<DisplayTemplateProps> = (props) => {
  const { type, template } = props

  const blockTemplateMap: TemplateMap = {
    0: <BlockTemplate0 {...(props as IResumeBlockSetting)} />,
  }

  const InfoTemplateMap: TemplateMap = {
    0: <InfoTemplate0 {...(props as IResumeInfoSetting)} />,
  }

  return (
    type === 'block'
      ? blockTemplateMap[template]
      : InfoTemplateMap[template]
  )
}

export default PreviewTemplate
