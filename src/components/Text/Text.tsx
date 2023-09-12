import React, { useContext, useRef, useState } from 'react'

import { Icon } from '@iconify/react'
import { Input, Tooltip } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

import { AppContext } from '@/App'
import { useAppStore, useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type {
  IResumeBlock, IResumeExperienceItem, IResumeInfoItem, IResumeListItem,
} from '@/store'
import type { TextProps } from '@/types'

type Props = TextProps & {
  onDbClick?: (...data: any) => any
} & ({
  block: IResumeBlock
  item: IResumeExperienceItem | IResumeInfoItem | IResumeListItem
  itemType?: keyof IResumeExperienceItem
} | {
  block?: never
  item?: never
  itemType?: never
})

const Text: React.FC<Props> = (props) => {
  const {
    value,
    style,
    icon,
    iconColor,
    classes,
    md,
    iconSize,
    block,
    item = {} as IResumeExperienceItem,
    itemType = '' as keyof IResumeExperienceItem,
  } = props

  const [editting, setEditting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const { setShowEdit } = useAppStore()
  const { setSelectedEditItem } = useContext(AppContext)

  const {
    updateResumeExpItem,
    updateResumeListItem,
    updateResumeInfoItem,
  } = useResumeStore()

  const cname = classNames('text-left', classes)
  const iconClass = classNames('mr-1 flex-shrink-0', {
    [`text-${iconSize}`]: iconSize,
  })

  const handleDbClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (props.onDbClick) {
      props.onDbClick()
    }
    setSelectedEditItem({} as SelectedEditItemData)
    setShowEdit(false)
    setEditting(!editting)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const renderText = () => (
    <div role="presentation" onDoubleClick={handleDbClick}>
      { md
    ? (
      <div>
        {icon ? <Icon className={iconClass} icon={icon} color={iconColor} /> : null}
        <ReactMarkdown>{value as string}</ReactMarkdown>
      </div>
    )
    : (
      <div className="flex items-center">
        {icon ? <Icon className={iconClass} icon={icon} color={iconColor} /> : null}
        <span style={style}>{value}</span>
      </div>
    )}
    </div>

  )

  const updateItem = (
    newValue: string,
  ) => {
    switch (block?.type) {
      case 'exp':
        updateResumeExpItem(block!.id, item.id, {
          ...item,
          [itemType]: {
            ...(item as IResumeExperienceItem)[itemType] as object,
            value: newValue,
          },
        })
        break
      case 'info':
        updateResumeInfoItem(item.id, {
          ...item,
          value: newValue,
        })
        break
      case 'list':
        updateResumeListItem(block!.id, item.id, {
          ...item,
          value: newValue,
        })
        break
      default:
        break
    }
  }

  const preventDragging = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.stopPropagation()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setEditting(false)
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateItem(e.target.value)
  }

  const renderEditting = () => (
    <div className="flex flex-col w-full" role="presentation" onClick={preventDragging} onMouseDown={preventDragging}>
      <Tooltip title={t('pressEscFinishEdit')}>
        <Input.TextArea
          ref={inputRef}
          value={value}
          onChange={handleTextInputChange}
          onKeyDown={handleKeyPress}
          onBlur={() => setEditting(false)}
          onMouseDown={preventDragging}
        />
      </Tooltip>

    </div>
  )

  const render = () => (editting
    ? renderEditting()
    : renderText())

  return (
    <div
      className={cname}
      role="presentation"
      onTouchStart={(e) => e.stopPropagation()}
      onDrag={(e) => e.stopPropagation()}
      onDragStart={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div>
        {render()}
      </div>

    </div>
  )
}

export default Text
