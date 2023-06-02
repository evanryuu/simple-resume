import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import { ColorPicker, Input, InputNumber } from 'antd'

import type { Color, TextProps } from '@/types'
import type { InputNumberProps } from 'antd'
import type { Color as AntColor } from 'antd/es/color-picker'
import type { valueType } from 'antd/es/statistic/utils'

export type TextEditorProps = TextProps & DifferentInput & {
  label: string
  labelRightEl?: React.ReactNode
  hideMore?: boolean
  children?: React.ReactNode
  onChangeAll?: (data: TextProps) => void
  onIconColorChange?: (value: Color) => void
  onIconChange?: (value: string) => void
}

type DifferentInput = {
  type?: 'text'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} | {
  type?: 'number'
  onChange?: (value: number) => void
  inputNumberProps?: InputNumberProps
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const {
    label,
    onChange,
    hideMore,
    children,
    type,
    onIconChange,
    onIconColorChange,
    labelRightEl,
    onChangeAll,
  } = props

  const [value, setValue] = useState(props.value)
  const [showMore, setShowMore] = useState(false)
  const [icon, setIcon] = useState(props.icon || '')
  const [iconColor, setIconColor] = useState(props.iconColor)
  const [md, setMd] = useState(props.md)
  const [fieldsData, setTextData] = useState<TextProps>({
    value,
    icon,
    iconColor,
    color: props.color,
    style: props.style,
    classes: props.classes,
    md,
  })
  // const [styles, setStyles] = useState(props.style || {})

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.value)
    if (onIconChange) {
      onIconChange(e.target.value)
    }
    if (onChangeAll) {
      onChangeAll({
        ...fieldsData,
        icon: e.target.value,
      })
    }
  }

  const handleIconColorChange = (_: AntColor, color: string) => {
    console.log('IconColorChange', color)
    setIconColor(color as Color)
    if (onIconColorChange) {
      onIconColorChange(color as Color)
    }
    if (onChangeAll) {
      onChangeAll({
        ...fieldsData,
        iconColor: color as Color,
      })
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement> & number)
    }
    if (onChangeAll) {
      onChangeAll({
        ...fieldsData,
        value: e.target.value,
      })
    }
  }

  const handleNumberInputChange = (v: valueType | null) => {
    const val = v as number
    setValue(val)
    if (onChange) {
      onChange(val as React.ChangeEvent<HTMLInputElement> & number)
    }
    if (onChangeAll) {
      onChangeAll({
        ...fieldsData,
        value: val,
      })
    }
  }

  const generateInput = () => {
    if (type === 'text') {
      return <Input id={label} value={value} onChange={handleTextInputChange} />
    } if (type === 'number') {
      return <InputNumber {...props.inputNumberProps} onChange={handleNumberInputChange} value={value as number} placeholder="Icon" />
    }
    return null
  }

  return (
    <div className="border-b-gray-300 border-b-1 border-solid border-t-0 border-l-0 border-r-0 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <label className="text-gray-400 font-semibold tracking-widest" htmlFor={label}>{label.toUpperCase()}</label>
        {labelRightEl || null}
      </div>
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
