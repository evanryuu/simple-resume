import React, { useState } from 'react'

import {
  ColorPicker, Input, InputNumber, Select, Slider, Switch,
} from 'antd'

import type { BaseInputType } from '@/types'

export interface BaseInputProps {
  type: BaseInputType
  value: any
  label?: string
  defaultChecked?: boolean
  componentProps?: any
  description?: React.ReactNode
  onChange: (value: any) => void
}

const BaseInput: React.FC<BaseInputProps> = (props) => {
  const {
    type, label, onChange, defaultChecked, componentProps, description,
  } = props
  const [value, setValue] = useState(props.value)

  const renderInput = () => {
    switch (type) {
      case 'color': {
        const handleColorChange = (_: any, color: string) => {
          setValue(color)
          onChange(color)
        }
        return <ColorPicker className="mt-2" {...componentProps} value={value} onChange={handleColorChange} />
      }
      case 'boolean': {
        const handleSwitchChange = (checked: boolean) => {
          setValue(checked)
          onChange(checked)
        }
        return <Switch className="mt-2" {...componentProps} defaultChecked={defaultChecked} checked={value} onChange={handleSwitchChange} />
      }
      case 'number': {
        const handleNumberChange = (number: number | null) => {
          console.log('changed', number)
          setValue(number)
          onChange(number)
        }
        return <InputNumber {...componentProps} value={value as number} onChange={handleNumberChange} />
      }
      case 'string': {
        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
          onChange(value)
        }
        return <Input {...componentProps} onChange={handleTextChange} value={value} />
      }
      case 'textarea': {
        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
          onChange(value)
        }
        return <Input.TextArea {...componentProps} onChange={handleTextChange} value={value} />
      }
      case 'slider': {
        const handleSlideChange = (data: any) => {
          setValue(data)
          console.log('value', data)
          onChange(data)
        }
        return <Slider {...componentProps} onChange={handleSlideChange} value={value} />
      }
      case 'select': {
        const handleSelectChange = (data: string) => {
          setValue(data)
          onChange(data)
        }
        return <Select className="mt-2" {...componentProps} onChange={handleSelectChange} value={value} />
      }
      default:
        break
    }
  }

  return (
    <div className="mt-2">
      <div className="text-gray-400 font-semibold tracking-widest">{label ? <label htmlFor={label}>{label}</label> : null}</div>
      {renderInput()}
      {description}
    </div>
  )
}

export default BaseInput
