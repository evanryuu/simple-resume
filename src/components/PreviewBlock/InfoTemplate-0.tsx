import React from 'react'

import { useResumeStyleStore } from '@/store/style'

import type { IResumeInfoData } from '@/store/resume'

import Text from '../Text/Text'

export type InfoTemplateProps = IResumeInfoData

const InfoTemplate0: React.FC<IResumeInfoData> = (props) => {
  const {
    name, avatar, items,
  } = props
  const { resumeStyle } = useResumeStyleStore()

  return (
    <div className="flex items-start">
      {
        avatar
          ? (<img
            src={avatar}
            alt="Avatar"
            width={resumeStyle.avatarWidth}
            style={{ borderRadius: resumeStyle.avatarRounded ? '50%' : 0 }}
          />
          )
          : null
      }
      <div className="info-container ml-4">
        <div className="info-name">{name}</div>
        <div className="info-desc-container grid grid-cols-1 text-sm">
          {
            items.length && items.map((item, i) => (
              <Text classes="flex items-center" key={i} {...item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default InfoTemplate0
