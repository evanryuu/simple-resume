import React from 'react'

import ExpTemplate from './ExpTemplate'
import InfoTemplate from './InfoTemplate'

import type {
  IResumeBlock, IResumeExperience, IResumeInfo,
} from '@/store/resume'

export type DisplayTemplateProps = IResumeBlock

const PreviewTemplate: React.FC<DisplayTemplateProps> = (props) => {
  const { type } = props

  const getTemplate = () => {
    switch (type) {
      case 'exp':
        return <ExpTemplate {...(props as IResumeExperience)} />

      case 'info':
        return <InfoTemplate {...(props as IResumeInfo)} />

      case 'list':
        return null

      default:
        throw new Error('Wrong template type')
    }
  }

  return (
    getTemplate()
  )
}

export default PreviewTemplate
