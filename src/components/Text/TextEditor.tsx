import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import { ColorPicker, Input, InputNumber } from 'antd'

import type { Color, TextProps } from '@/types'
import type { InputNumberProps } from 'antd'
import type { Color as AntColor } from 'antd/es/color-picker'

export type TextEditorProps = TextProps & DifferentInput & {
  label: string
  hideMore?: boolean
  children?: React.ReactNode
  onIconColorChange?: (value: Color) => void
  onIconChange?: (value: string) => void
}

type DifferentInput = {
  type?: 'text'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} | {
  type?: 'number'
  onChange: (value: number) => void
  inputNumberProps?: InputNumberProps
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const {
    value, label, onChange, hideMore, children, type, onIconChange, onIconColorChange,
  } = props

  const [showMore, setShowMore] = useState(false)
  const [icon, setIcon] = useState(props.icon || '')
  const [iconColor, setIconColor] = useState(props.iconColor || '')
  // const [styles, setStyles] = useState(props.style || {})

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.value)
    if (onIconChange) {
      onIconChange(e.target.value)
    }
  }

  const handleIconColorChange = (_: AntColor, color: string) => {
    console.log('IconColorChange', color)
    setIconColor(color)
    if (onIconColorChange) {
      onIconColorChange(color as Color)
    }
  }

  const generateInput = () => {
    if (type === 'text') {
      return <Input id={label} value={value} onChange={onChange} />
    } if (type === 'number') {
      return <InputNumber {...props.inputNumberProps} value={value as number} placeholder="Icon" />
    }
    return null
  }

  return (
    <div className="border-b-gray-300 border-b-1 border-solid border-t-0 border-l-0 border-r-0 pt-2 pb-4">
      <label className="text-gray-400 font-semibold tracking-widest" htmlFor={label}>{label.toUpperCase()}</label>
      <div className="flex items-center justify-between mt-2">
        {
          generateInput()
        }
        {!hideMore
          ? (
            <Icon
              fontSize={32}
              icon="mingcute:more-3-line"
              className="hover:text-cyan ml-4 cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            />
          )
          : null}
      </div>
      {
        showMore && !hideMore
          ? (
            <div className="flex items-center flex-col mt-2">
              <div className="grid grid-cols-2">
                <span>
                  <Input value={icon} onChange={handleIconChange} placeholder="Icon" />
                </span>
                <span className="ml-2">
                  <ColorPicker
                    value={iconColor}
                    onChange={handleIconColorChange}
                  />
                </span>
              </div>
            </div>
          )
          : null
      }
      <div>
        {children}
      </div>
    </div>
  )
}

TextEditor.defaultProps = {
  type: 'text',
}

export default TextEditor
