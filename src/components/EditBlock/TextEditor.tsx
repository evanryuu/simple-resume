import React, {
  useContext, useEffect, useRef, useState,
} from 'react'

import { Icon } from '@iconify/react'
import {
  ColorPicker, Input, Select, Switch,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { AppContext } from '@/App'
import { useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type {
  IResumeBlockSetting, IResumeInfoSetting,
  IResumeBlockItem,
} from '@/store'
import type { Color, IconSize, TextProps } from '@/types'
import type { Color as AntColor } from 'antd/es/color-picker'

import HoverChangeColor from '../Hover'

interface IdWhenNotItems {
  /**
   * !important
   *
   * used to differ `name` and `avatar` to highlight input
   *
   */
  dataKey: 'name' | 'avatar'
  id?: undefined
}

interface IdWhenItems {
  /**
   * !important
   *
   * used to differ `name` and `avatar` to highlight input
   *
   */
  dataKey: 'items' | keyof IResumeBlockItem
  id: string
}

export type TextEditorProps = TextProps & (IdWhenItems | IdWhenNotItems) & {
  type?: 'text' | 'textarea'
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  block: IResumeInfoSetting | IResumeBlockSetting
  label: string
  labelRightEl?: React.ReactNode
  hideMore?: boolean
  children?: React.ReactNode
  onChangeAll?: (data: TextProps) => void
  onIconColorChange?: (value: Color) => void
  onIconChange?: (value: string) => void
  onIconSizeChange?: (value: IconSize) => void
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
    onIconSizeChange,
    labelRightEl,
    onChangeAll,
  } = props

  const [loaded, setLoaded] = useState(false)
  const [value, setValue] = useState(props.value)
  const [showMore, setShowMore] = useState(false)
  const [icon, setIcon] = useState(props.icon || '')
  const [iconColor, setIconColor] = useState(props.iconColor)
  const [iconSize, setIconSize] = useState(props.iconSize)
  const [md, setMd] = useState(props.md)

  const inputRef = useRef<any>(null)

  const { selectedEditItem, setSelectedEditItem } = useContext(AppContext)

  const { t } = useTranslation()

  const { resumeStyle } = useResumeStore()

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
        iconSize: iconSize || 'md',
      })
    }
  }, [value, icon, iconColor, md, iconSize])

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  useEffect(() => {
    if (selectedEditItem.type === 'items') {
      if (props.id === selectedEditItem.itemId && selectedEditItem.type === props.dataKey && props.block.id === selectedEditItem.blockId) {
        setTimeout(inputRef.current?.focus, 0)
      }
      /**
       * must judge blockId
       *
       *  make sure same item(title/subtitle/note/detail/description) in different blocks won't conflict
       *
       */
    } else if (selectedEditItem.type === props.dataKey && props.block.id === selectedEditItem.blockId) {
      if (!selectedEditItem.itemId) {
        setTimeout(inputRef.current?.focus, 0)
      } else if (selectedEditItem.itemId === props.id) {
        setTimeout(inputRef.current?.focus, 0)
      }
    }
  }, [selectedEditItem.type, selectedEditItem.itemId])

  // const ifHighlight = () => {
  //   /** avatar and name don't have id */
  //   if (selectedEditItem.type === 'avatar' || selectedEditItem.type === 'name') {
  //     return props.dataKey === selectedEditItem.type
  //   }
  //   if (selectedEditItem.type === 'items') {
  //     if (selectedEditItem.blockType === 'info') {
  //       return props.id === selectedEditItem.itemId
  //     }
  //   } else {
  //     return props.dataKey === selectedEditItem.type
  //   }
  //   return false
  // }

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.value)
    if (onIconChange) {
      onIconChange(e.target.value)
    }
  }

  const handleIconColorChange = (_: AntColor, color: string) => {
    setIconColor(color as Color)
    if (onIconColorChange) {
      onIconColorChange(color as Color)
    }
  }

  const iconSizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'].map((v) => ({ label: v, value: v }))

  const handleIconSizeChange = (size: IconSize) => {
    setIconSize(size)
    if (onIconSizeChange) {
      onIconSizeChange(size)
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement> & number)
    }
  }

  const handleInputFocus = () => {
    const item: SelectedEditItemData = {
      ...selectedEditItem,
      type: props.dataKey,
      itemId: '',
    }
    item.itemId = props.id
    if (props.block) {
      item.blockId = props.block.id
      item.blockType = props.block.type
    }
    // setTimeout(() => setSelectedEditItem(item as SelectedEditItemData), 0)
    setSelectedEditItem(item as SelectedEditItemData)
  }

  const generateInput = () => {
    if (type === 'text') {
      if (md) {
        return <Input.TextArea ref={inputRef} id={label} value={value} onChange={handleTextInputChange} onFocus={handleInputFocus} />
      }
      return <Input ref={inputRef} id={label} value={value} onChange={handleTextInputChange} onFocus={handleInputFocus} />
    }
    if (type === 'textarea') {
      return <Input.TextArea ref={inputRef} id={label} value={value} onChange={handleTextInputChange} onFocus={handleInputFocus} />
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
        {/* S Input */}
        {generateInput()}
        {/* E Input */}

        {/* S More Button */}
        {
          !hideMore
            ? (
              <HoverChangeColor>
                <Icon
                  fontSize={20}
                  icon="mingcute:more-3-line"
                  className="ml-4 cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                />
              </HoverChangeColor>
            )
            : null
        }
        {/* E More Button */}
      </div>

      {/* S More Section */}
      {
        showMore && !hideMore
          ? (
            <div className="flex items-start flex-col mt-2">
              <div className="flex items-center">
                <span className="flex-shrink-0">{t('icon')}</span>
                <Input className="ml-2" value={icon} onChange={handleIconChange} placeholder="Icon" />
              </div>
              <div className="mt-2 flex items-center">
                <span>{t('iconColor')}</span>
                <ColorPicker
                  className="ml-2"
                  presets={[
                    {
                      label: 'theme',
                      colors: [resumeStyle.themeColor.value],
                    },
                  ]}
                  value={iconColor}
                  onChange={handleIconColorChange}
                />
              </div>
              <div className="mt-2 flex items-center">
                <span>{t('iconSize')}</span>
                <Select
                  className="ml-2"
                  defaultValue="md"
                  options={iconSizeOptions}
                  value={iconSize}
                  onSelect={(size) => handleIconSizeChange(size as IconSize)}
                />
              </div>
              <div className="mt-2 flex w-full justify-between">
                <span>Markdown </span>
                <Switch
                  className="ml2"
                  checked={md}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={() => {
                    setMd(!md)
                  }}
                />
              </div>
            </div>
          )
          : null
      }
      {/* E More Section */}
      <div>
        {children}
      </div>
    </div>
  )
}

TextEditor.defaultProps = {
  type: 'text',
  dataKey: 'items',
}

export default TextEditor
