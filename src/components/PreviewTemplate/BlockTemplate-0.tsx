import React from 'react'

import classNames from 'classnames'

import { useResumeStore } from '@/store'

import type { IResumeBlockData } from '@/store/resume'

import Text from '../Text/Text'

export type BlockTemplateProps = IResumeBlockData

const BlockTemplate0: React.FC<BlockTemplateProps> = (props) => {
  const { title, items } = props
  const { resumeStyle } = useResumeStore()

  const titleIsNotText = resumeStyle.titleStyle !== 'text'

  const titleClasses = classNames('block-title font-semibold text-left py-1 tracking-widest', {
    [`is-${resumeStyle.titleStyle}`]: titleIsNotText,
  })

  return (
    <div className="mt-4">
      <div
        className={titleClasses}
        style={{
          color: titleIsNotText ? '#fff' : resumeStyle.themeColor,
          background: titleIsNotText ? resumeStyle.themeColor : '#fff',
          paddingLeft: titleIsNotText ? 8 : 0,
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
                  classes="ml-2 text-xs inline-block"
                  style={{
                    fontSize: resumeStyle.subtitleSize,
                    color: resumeStyle.subtitleColor,
                    padding: '0px 4px',
                    borderRadius: 2,
                    backgroundColor: resumeStyle.subtitleBackgroundColor,
                  }}
                  {...item.subtitle!}
                />
              </div>
              {item.note && <Text
                style={{
                  fontSize: resumeStyle.noteSize,
                  color: resumeStyle.noteColor,
                  padding: '0px 4px',
                  borderRadius: 2,
                  backgroundColor: resumeStyle.noteBackgroundColor,
                }}
                classes="specific-title-note text-sm inline-block"
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
