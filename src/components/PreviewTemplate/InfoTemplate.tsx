import React, { useContext, useRef } from 'react'

import classNames from 'classnames'

import { AppContext } from '@/App'
import { useAppStore, useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type { IResumeInfo, IResumeInfoData } from '@/store/resume'

import Text from '../Text/Text'

export type InfoTemplateProps = IResumeInfo

const InfoTemplate0: React.FC<IResumeInfo> = (props) => {
  const {
    name, avatar, items,
  } = props.data
  const singleClick = useRef<boolean>(false)
  const { resumeStyle } = useResumeStore()
  const { setShowEdit, showEditDelay } = useAppStore()

  const { selectedEditItem, setSelectedEditItem } = useContext(AppContext)

  const genParam = (type: keyof IResumeInfoData, itemId?: string): SelectedEditItemData => {
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
    <div>

      <div className="flex items-start">
        {
          avatar
            ? (<img
                className={classNames('editable !pointer-events-auto', {
                editting: selectedEditItem.type === 'avatar',
              })}
                role="presentation"
                src={avatar}
                alt="Avatar"
                width={resumeStyle.avatarWidth.value}
                style={{ borderRadius: resumeStyle.avatarRounded.value ? '50%' : 0 }}
                onClick={() => handleItemClick(genParam('avatar'))}
            />
            )
            : null
        }
        <div className={classNames('info-container', {
          'ml-4': resumeStyle.avatarWidth.value !== 0,
        })}
        >
          <div
            role="presentation"
            onClick={() => handleItemClick(genParam('name'))}
            className={classNames('inline-block info-name font-semibold text-2xl editable', {
              editting: selectedEditItem.type === 'name',
            })}
          >
            {name}
          </div>
          <div
            className="info-desc-container grid text-sm"
            style={{
              marginTop: resumeStyle.infoDescMarginTop.value,
              gridTemplateColumns: `repeat(${resumeStyle.infoItemsColumn.value}, minmax(0, 1fr))`,
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
      <div
        style={{
          height: 1,
          backgroundColor: resumeStyle.lineBelowInfo.value,
        }}
        className="my-6"
      />
    </div>
  )
}

export default InfoTemplate0
