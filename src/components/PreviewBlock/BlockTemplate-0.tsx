import React from 'react'

import classNames from 'classnames'

import { useResumeStyleStore } from '@/store/style'

import type { IResumeBlockData } from '@/store/resume'

import Text from '../Text/Text'

export type BlockTemplateProps = IResumeBlockData

const BlockTemplate0: React.FC<BlockTemplateProps> = (props) => {
  const { title, items } = props
  const { resumeStyle } = useResumeStyleStore()

  const titleIsBanner = resumeStyle.titleStyle === 'banner'

  const titleClasses = classNames('block-title font-semibold text-left py-1 tracking-widest', {
    'is-banner': titleIsBanner,
  })

  return (
    <div className="mt-4">
      <div
        className={titleClasses}
        style={{
          color: titleIsBanner ? '#fff' : resumeStyle.themeColor,
          background: titleIsBanner ? resumeStyle.themeColor : '#fff',
          paddingLeft: titleIsBanner ? 8 : 0,
          fontSize: resumeStyle.blockHeaderSize,
        }}
      >
        {title.value}
      </div>
      {
        items.map((item, i) => (
          <div className="specific-container" key={i}>
            <div className="flex items-center justify-between">
              <div className="specific-title flex items-center">
                <Text
                  style={{
                    fontSize: resumeStyle.titleSize,
                  }}
                  classes="text-md font-bold"
                  {...item.title}
                />
                <Text
                  classes="ml-2 text-xs"
                  style={{
                    fontSize: resumeStyle.subtitleSize,
                    color: resumeStyle.subtitleColor,
                  }}
                  {...item.subtitle!}
                />
              </div>
              {item.note && <Text
                style={{
                  fontSize: resumeStyle.noteSize,
                  color: resumeStyle.noteColor,
                  backgroundColor: resumeStyle.noteBackgroundColor,
                }}
                classes="specific-title-note text-sm"
                {...item.note}
              />}
            </div>
            {item.description && <Text classes="text-sm" {...item.description} />}
            {item.detail && <Text {...item.detail} />}
          </div>
        ))
      }
    </div>
  )
}

export default BlockTemplate0
