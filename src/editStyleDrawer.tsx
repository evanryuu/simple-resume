import React from 'react'

import { Drawer } from 'antd'
import { useTranslation } from 'react-i18next'

import BaseInput from './components/Input/BaseInput'
import { useResumeStore } from './store'

import type { IResumeStyle } from './store'
import type { DrawerProps } from 'antd'

export interface EditDrawerProps extends DrawerProps {

}

const EditStyleDrawer: React.FC<EditDrawerProps> = (props) => {
  const {
    open, onClose, children, ...rest
  } = props

  const { t } = useTranslation()

  const { resumeStyle, setResumeStyle } = useResumeStore()

  const handleChange = <T extends keyof IResumeStyle>(key: T, value: IResumeStyle[T]) => {
    setResumeStyle({
      ...resumeStyle,
      [key]: {
        value,
        type: resumeStyle[key].type,
        componentProps: resumeStyle[key].componentProps,
      },
    })
  }

  const DrawerHeader = (
    <div className="flex justify-between items-center">
      <span>{t('editStyle')}</span>
    </div>
  )

  return (
    <Drawer
      title={DrawerHeader}
      placement="right"
      mask={false}
      open={open}
      onClose={onClose}
      {...rest}
    >
      {
        Object.keys(resumeStyle)
          .map((key) => (
            <BaseInput
              key={key}
              label={t(key)}
              type={resumeStyle[key as keyof IResumeStyle].type}
              value={resumeStyle[key as keyof IResumeStyle].value}
              onChange={(value) => handleChange(key as keyof IResumeStyle, value)}
              componentProps={resumeStyle[key as keyof IResumeStyle].componentProps}
            />
          ))
      }
      {children}
    </Drawer>
  )
}

export default EditStyleDrawer
