import React, { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import {
  ColorPicker, Input, InputNumber, Switch,
} from 'antd'

import { useResumeStyleStore } from '@/store'

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
  type?: 'text' | 'textarea'
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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

  const [loaded, setLoaded] = useState(false)
  const [value, setValue] = useState(props.value)
  const [showMore, setShowMore] = useState(false)
  const [icon, setIcon] = useState(props.icon || '')
  const [iconColor, setIconColor] = useState(props.iconColor)
  const [md, setMd] = useState(props.md)

  const { resumeStyle } = useResumeStyleStore()

  // const [styles, setStyles] = useState(props.style || {})
  useEffect(() => {
    setLoaded(true)
  }, [])
  useEffect(() => {
    if (onChangeAll && loaded) {
      onChangeAll({
        value: value || '',
        icon: icon || '',
        iconColor,
        md: md ?? false,
      })
    }
  }, [value, icon, iconColor, md])

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.value)
    if (onIconChange) {
      onIconChange(e.target.value)
    }
  }

  const handleIconColorChange = (_: AntColor, color: string) => {
    console.log('IconColorChange', color)
    setIconColor(color as Color)
    if (onIconColorChange) {
      onIconColorChange(color as Color)
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.value)
    setValue(e.target.value)
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement> & number)
    }
  }

  const handleNumberInputChange = (v: valueType | null) => {
    const val = v as number
    setValue(val)
    if (onChange) {
      onChange(val as React.ChangeEvent<HTMLInputElement> & number)
    }
  }

  const generateInput = () => {
    if (type === 'text') {
      if (md) {
        return <Input.TextArea id={label} value={value} onChange={handleTextInputChange} />
      }
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
                    presets={[
                      {
                        label: 'theme',
                        colors: [resumeStyle.themeColor],
                      },
                    ]}
                    value={iconColor}
                    onChange={handleIconColorChange}
                  />
                </span>
              </div>
              <div className="mt-2 flex w-full items-center">
                <span>Markdown </span>
                <Switch
                  className="ml2"
                  checked={md}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={() => {
                    console.log(1, md)
                    setMd(!md)
                  }}
                />
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
