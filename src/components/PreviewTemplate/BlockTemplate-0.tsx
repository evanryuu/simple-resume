import React from 'react'

import classNames from 'classnames'

import { useResumeStore } from '@/store'

import type { IResumeBlockData } from '@/store/resume'

import Text from '../Text/Text'

export type BlockTemplateProps = IResumeBlockData

const BlockTemplate0: React.FC<BlockTemplateProps> = (props) => {
  const { title, items } = props
  const { resumeStyle } = useResumeStore()

  const titleIsNotText = resumeStyle.titleStyle.value !== 'text'

  const titleClasses = classNames('block-title font-semibold text-left py-1 tracking-widest', {
    [`is-${resumeStyle.titleStyle.value}`]: titleIsNotText,
  })

  return (
    <div className="mt-4">
      <div
        className={titleClasses}
        style={{
          color: titleIsNotText ? '#fff' : resumeStyle.themeColor.value,
          background: titleIsNotText ? resumeStyle.themeColor.value : '#fff',
          paddingLeft: titleIsNotText ? 8 : 0,
          fontSize: resumeStyle.blockHeaderSize.value,
        }}
      >
        {title.value}
      </div>
      {
        items.map((item, i) => (
          <div className="specific-container" key={i}>
            <div className="flex items-center justify-between">
              <div className="specific-title flex items-center">
                {
                  item.title && item.title.value
                  && <Text
                    style={{
                      fontSize: resumeStyle.titleSize.value,
                    }}
                    classes="text-md font-bold"
                    {...item.title}
                  />
                }
                {
                  item.subtitle && item.subtitle.value
                  && <Text
                    classes="ml-2 text-xs inline-block"
                    style={{
                      fontSize: resumeStyle.subtitleSize.value,
                      color: resumeStyle.subtitleColor.value,
                      padding: '0px 4px',
                      borderRadius: 2,
                      backgroundColor: resumeStyle.subtitleBackgroundColor.value,
                    }}
                    {...item.subtitle}
                  />
                }
              </div>
              {
                item.note && item.note.value
                && <Text
                  style={{
                    fontSize: resumeStyle.noteSize.value,
                    color: resumeStyle.noteColor.value,
                    padding: '0px 4px',
                    borderRadius: 2,
                    backgroundColor: resumeStyle.noteBackgroundColor.value,
                  }}
                  classes="specific-title-note text-sm inline-block"
                  {...item.note}
                />
              }
            </div>
            {item.description && item.description.value && <Text classes="text-sm" {...item.description} />}
            {item.detail && item.detail.value && <Text {...item.detail} />}
          </div>
        ))
      }
    </div>
  )
}

export default BlockTemplate0
