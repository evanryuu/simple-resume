import React from 'react'

import classNames from 'classnames'

import { useResumeStyleStore } from '@/store/style'

import type { IResumeBlockData } from '@/store/resume'

import Text from '../Text/Text'

export type BlockTemplateProps = IResumeBlockData

const BlockTemplate0: React.FC<BlockTemplateProps> = (props) => {
  const { title, specifics } = props
  const { resumeStyle } = useResumeStyleStore()

  const titleClasses = classNames('block-title', {
    'is-banner': resumeStyle.titleStyle === 'banner',
  })

  return (
    <div>
      <div className={titleClasses}>{title.value}</div>
      {
        specifics.map((specific, i) => (
          <div className="specific-container" key={i}>
            <div className="flex items-center justify-between">
              <div className="specific-title">
                {specific.title && <Text {...specific.title} />}
                {specific.subtitle && <Text {...specific.subtitle} />}
              </div>
              {specific.note && <Text className="specific-title-note" {...specific.note} />}
            </div>
            {specific.description && <Text {...specific.description} />}
            {specific.detail && <Text {...specific.detail} />}
          </div>
        ))
      }
    </div>
  )
}

export default BlockTemplate0
