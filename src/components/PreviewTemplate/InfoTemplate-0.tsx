import React, { useContext } from 'react'

import classNames from 'classnames'

import { AppContext } from '@/App'
import { useAppStore, useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type { IResumeInfoSetting, IResumeInfoData } from '@/store/resume'

import Text from '../Text/Text'

export type InfoTemplateProps = IResumeInfoSetting

const InfoTemplate0: React.FC<IResumeInfoSetting> = (props) => {
  const {
    name, avatar, items,
  } = props.data
  const { resumeStyle } = useResumeStore()
  const { setShowEdit } = useAppStore()

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
    setShowEdit(true)
    setSelectedEditItem(value)
  }

  return (
    <div>

      <div className="flex items-start">
        {
          avatar
            ? (<img
              className={classNames('editable', {
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
        <div className="info-container ml-4">
          <div
            role="presentation"
            onClick={() => handleItemClick(genParam('name'))}
            className={classNames('inline-block info-name font-semibold text-lg editable', {
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
                  <Text classes="flex items-center" {...item} />
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
