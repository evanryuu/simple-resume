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
      [key]: value,
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
      mask
      maskStyle={{
        backgroundColor: 'transparent',
      }}
      open={open}
      onClose={onClose}
      {...rest}
    >
      <BaseInput
        type="color"
        label={t('themeColor')}
        value={resumeStyle.themeColor}
        onChange={(value) => handleChange('themeColor', value)}
      />
      <BaseInput
        type="slider"
        componentProps={{
          min: 40,
          max: 240,
        }}
        label={t('avatarWidth')}
        value={resumeStyle.avatarWidth}
        onChange={(value) => handleChange('avatarWidth', value)}
      />
      <BaseInput
        type="boolean"
        componentProps={{
          defaultChecked: resumeStyle.avatarRounded,
        }}
        label={t('avatarRounded')}
        value={resumeStyle.avatarRounded}
        onChange={(value) => handleChange('avatarRounded', value)}
      />
      <BaseInput
        type="slider"
        componentProps={{
          min: 1,
          max: 4,
        }}
        label={t('infoItemsColumn')}
        value={resumeStyle.infoItemsColumn}
        onChange={(value) => handleChange('infoItemsColumn', value)}
      />
      <BaseInput
        type="color"
        label={t('lineBelowInfo')}
        value={resumeStyle.lineBelowInfo}
        onChange={(value) => handleChange('lineBelowInfo', value)}
      />
      <BaseInput
        type="slider"
        label={t('pagePadding')}
        componentProps={{
          min: 0,
          max: 40,
        }}
        value={resumeStyle.pagePadding}
        onChange={(value) => handleChange('pagePadding', value)}
      />
      <BaseInput
        type="slider"
        label={t('blockHeaderSize')}
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.blockHeaderSize}
        onChange={(value) => handleChange('blockHeaderSize', value)}
      />
      <BaseInput
        type="slider"
        label={t('titleSize')}
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.titleSize}
        onChange={(value) => handleChange('titleSize', value)}
      />
      <BaseInput
        type="select"
        label={t('titleStyle')}
        componentProps={{
          options: [
            { value: 'banner', label: 'Banner' },
            { value: 'text', label: 'Text' },
            { value: 'tag', label: 'Tag' },
          ],
        }}
        value={resumeStyle.titleStyle}
        onChange={(value) => handleChange('titleStyle', value)}
      />
      <BaseInput
        type="slider"
        label={t('subtitleSize')}
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.subtitleSize}
        onChange={(value) => handleChange('subtitleSize', value)}
      />
      <BaseInput
        type="color"
        label={t('subtitleColor')}
        value={resumeStyle.subtitleColor}
        onChange={(value) => handleChange('subtitleColor', value)}
      />
      <BaseInput
        type="color"
        label={t('subtitleBackgroundColor')}
        value={resumeStyle.subtitleBackgroundColor}
        onChange={(value) => handleChange('subtitleBackgroundColor', value)}
      />
      <BaseInput
        type="slider"
        label={t('noteSize')}
        value={resumeStyle.noteSize}
        onChange={(value) => handleChange('noteSize', value)}
      />
      <BaseInput
        type="color"
        label={t('noteColor')}
        value={resumeStyle.noteColor}
        onChange={(value) => handleChange('noteColor', value)}
      />
      <BaseInput
        type="color"
        label={t('noteBackgroundColor')}
        value={resumeStyle.noteBackgroundColor}
        onChange={(value) => handleChange('noteBackgroundColor', value)}
      />
      {children}
    </Drawer>
  )
}

export default EditStyleDrawer
