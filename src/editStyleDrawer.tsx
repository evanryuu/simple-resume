import React from 'react'

import { Drawer } from 'antd'

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

  const { resumeStyle, setResumeStyle } = useResumeStore()

  const handleChange = <T extends keyof IResumeStyle>(key: T, value: IResumeStyle[T]) => {
    setResumeStyle({
      ...resumeStyle,
      [key]: value,
    })
  }

  const DrawerHeader = (
    <div className="flex justify-between">
      <span>编辑样式</span>
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
        label="Theme Color"
        value={resumeStyle.themeColor}
        onChange={(value) => handleChange('themeColor', value)}
      />
      <BaseInput
        type="slider"
        componentProps={{
          min: 40,
          max: 240,
        }}
        label="Avatar Width"
        value={resumeStyle.avatarWidth}
        onChange={(value) => handleChange('avatarWidth', value)}
      />
      <BaseInput
        type="boolean"
        componentProps={{
          defaultChecked: resumeStyle.avatarRounded,
        }}
        label="Avatar Rounded"
        value={resumeStyle.avatarRounded}
        onChange={(value) => handleChange('avatarRounded', value)}
      />
      <BaseInput
        type="slider"
        componentProps={{
          min: 1,
          max: 4,
        }}
        label="Info Items Column"
        value={resumeStyle.infoItemsColumn}
        onChange={(value) => handleChange('infoItemsColumn', value)}
      />
      <BaseInput
        type="color"
        label="Line Below Info"
        value={resumeStyle.lineBelowInfo}
        onChange={(value) => handleChange('lineBelowInfo', value)}
      />
      <BaseInput
        type="slider"
        label="Block Padding"
        componentProps={{
          min: 0,
          max: 40,
        }}
        value={resumeStyle.blockPadding}
        onChange={(value) => handleChange('blockPadding', value)}
      />
      <BaseInput
        type="slider"
        label="Block Header Size"
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.blockHeaderSize}
        onChange={(value) => handleChange('blockHeaderSize', value)}
      />
      <BaseInput
        type="slider"
        label="Title Size"
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.titleSize}
        onChange={(value) => handleChange('titleSize', value)}
      />
      <BaseInput
        type="select"
        label="Title Style"
        componentProps={{
          options: [
            { value: 'banner', label: 'Banner' },
            { value: 'text', label: 'Text' },
          ],
        }}
        value={resumeStyle.titleStyle}
        onChange={(value) => handleChange('titleStyle', value)}
      />
      <BaseInput
        type="slider"
        label="Subtitle Size"
        componentProps={{
          min: 10,
          max: 40,
        }}
        value={resumeStyle.subtitleSize}
        onChange={(value) => handleChange('subtitleSize', value)}
      />
      <BaseInput
        type="color"
        label="Subtitle Color"
        value={resumeStyle.subtitleColor}
        onChange={(value) => handleChange('subtitleColor', value)}
      />
      <BaseInput
        type="color"
        label="Subtitle Background Color"
        value={resumeStyle.subtitleBackgroundColor}
        onChange={(value) => handleChange('subtitleBackgroundColor', value)}
      />
      <BaseInput
        type="slider"
        label="Note Size"
        value={resumeStyle.noteSize}
        onChange={(value) => handleChange('subtitleColor', value)}
      />
      <BaseInput
        type="color"
        label="Note Color"
        value={resumeStyle.noteColor}
        onChange={(value) => handleChange('noteColor', value)}
      />
      <BaseInput
        type="color"
        label="Note Background Color"
        value={resumeStyle.noteBackgroundColor}
        onChange={(value) => handleChange('noteBackgroundColor', value)}
      />
      {children}
    </Drawer>
  )
}

export default EditStyleDrawer
