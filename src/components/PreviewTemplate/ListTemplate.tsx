import React, { useContext, useRef } from 'react'

import classNames from 'classnames'

import { AppContext } from '@/App'
import { useAppStore, useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type { IResumeList, IResumeListData } from '@/store/resume'

import Text from '../Text/Text'

export type ListTemplateProps = IResumeList

const ListTemplate: React.FC<ListTemplateProps> = (props) => {
  const { blockTitle, column, items } = props.data
  const singleClick = useRef<boolean>(false)
  const { resumeStyle } = useResumeStore()
  const { setShowEdit, showEditDelay } = useAppStore()

  const { selectedEditItem, setSelectedEditItem } = useContext(AppContext)
  const titleIsNotText = resumeStyle.titleStyle.value !== 'text'

  const titleClasses = classNames('editable block-title font-semibold text-left py-1 tracking-widest', {
    [`is-${resumeStyle.titleStyle.value}`]: titleIsNotText,
  })
  const genParam = (type: keyof IResumeListData, itemId?: string): SelectedEditItemData => {
    const idArr = [props.id]
    if (itemId) idArr.push(itemId)
    console.log(idArr)
    return {
      blockType: 'info',
      type,
      itemId,
      blockId: props.id,
      ids: idArr,
    }
  }

  const handleItemClick = (value: React.SetStateAction<SelectedEditItemData>) => {
    singleClick.current = true
    setTimeout(() => {
      if (singleClick.current) {
        setShowEdit(true)
        setSelectedEditItem(value)
      }
    }, showEditDelay)
  }

  return (
    <div className="mt-4">
      <div
        role="presentation"
        className={titleClasses}
        style={{
          color: titleIsNotText ? '#fff' : resumeStyle.themeColor.value,
          background: titleIsNotText ? resumeStyle.themeColor.value : '#fff',
          paddingLeft: titleIsNotText ? 8 : 0,
          fontSize: resumeStyle.blockHeaderSize.value,
        }}
        onClick={() => handleItemClick(genParam('blockTitle'))}
      >
        {blockTitle.value}
      </div>
      <div className="flex items-start w-full">
        <div className="list-container w-full">
          <div
            className="list-desc-container grid text-sm"
            style={{
              gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
            }}
          >
            {
              items.length && items.map((item) => (
                <div
                  key={item.id}
                  className={classNames('editable', {
                    editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'items',
                  })}
                  onClick={() => handleItemClick(genParam('items', item.id))}
                  role="presentation"
                >
                  <Text classes="flex items-center" {...item} block={props} item={item} onDbClick={() => { singleClick.current = false }} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListTemplate
