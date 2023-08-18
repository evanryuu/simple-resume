import React, {
  useContext, useLayoutEffect, useRef, useState,
} from 'react'

import { Icon } from '@iconify/react'
import { Input, Modal, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { AppContext } from '@/App'
import { useResumeStore } from '@/store/resume'

import type { SelectedEditItemData } from '@/App'
import type { IResumeBlock } from '@/store/resume'

import HoverChangeColor from '../Hover'

export type BlockEditorHeaderProps = IResumeBlock

const BlockHeader: React.FC<BlockEditorHeaderProps> = (props) => {
  const { data, type } = props
  const { t } = useTranslation()
  const { selectedEditItem, setSelectedEditItem } = useContext(AppContext)

  const [showBlockNameInput, setShowBlockNameInput] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const blockTitleInputRef = useRef<any>(null)

  const {
    deleteResumeBlock, updateResumeExpData, updateResumeListData, moveResumeBlock,
  } = useResumeStore()

  const handleInputFinished = () => {
    setShowBlockNameInput(false)
    setSelectedEditItem({} as SelectedEditItemData)
  }

  const handleInputFocus = () => {
    setSelectedEditItem({
      ...selectedEditItem,
      blockType: 'exp',
      blockId: props.id,
      type: 'blockTitle',
    })
  }

  const handleBlockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      blockTitle: {
        value: e.target.value,
      },
    }
    switch (type) {
      case 'exp':
        updateResumeExpData(props.id, newData)
        break
      case 'list':
        updateResumeListData(props.id, newData)
        break

      default:
        break
    }
  }

  const handleEditBlockName = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setShowBlockNameInput(!showBlockNameInput)
    setSelectedEditItem({} as SelectedEditItemData)
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }

  const handleMoveBlock = (e: React.MouseEvent) => {
    e.stopPropagation()
    moveResumeBlock(props.id, -1)
  }

  const deleteBlock = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    deleteResumeBlock(props.id)
    setShowDeleteConfirm(false)
  }

  const selectingBlockTitle = selectedEditItem.blockId === props.id && selectedEditItem.type === 'blockTitle'

  useLayoutEffect(() => {
    setTimeout(blockTitleInputRef.current?.focus, 0)
  }, [selectingBlockTitle])

  return (
    <>
      <div
        role="presentation"
        className="flex justify-between items-center cursor-pointer"
      >
        {/* S Block Title Section */}
        {
          (showBlockNameInput && props.type !== 'info') || selectingBlockTitle
            ? <Input
                ref={blockTitleInputRef}
                onBlur={handleInputFinished}
                onPressEnter={handleInputFinished}
                onClick={(e) => e.stopPropagation()}
                onFocus={handleInputFocus}
                value={data.blockTitle.value}
                onChange={handleBlockNameChange}
            />
            : (
              <div>
                {props.type !== 'info' ? data.blockTitle.value : t('personalInfo')}
              </div>
            )
        }
        {/* E Block Title Section */}

        {/* S Button Group Section */}
        <div className="flex items-center">
          <Tag className="tracking-wider ml-4">{props.type.toUpperCase()}</Tag>
          {
            type !== 'info'
              ? (
                <>
                  <HoverChangeColor>
                    <span
                      role="presentation"
                      title={t('editTitle') as string}
                      onClick={handleEditBlockName}
                      className="flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="mdi:square-edit-outline" />
                    </span>
                  </HoverChangeColor>
                  <HoverChangeColor>

                    <span
                      role="presentation"
                      title={t('moveUp') as string}
                      onClick={handleMoveBlock}
                      className="flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="mdi:arrow-up" />
                    </span>
                  </HoverChangeColor>
                  <HoverChangeColor>
                    <span
                      role="presentation"
                      title={t('delete') as string}
                      onClick={handleDeleteClick}
                      className="text-red flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="mdi:delete-off-outline" />
                    </span>
                  </HoverChangeColor>
                </>
              )
              : null
          }
        </div>
        {/* E Button Group Section */}

      </div>
      <Modal
        title={t('warning')}
        open={showDeleteConfirm}
        onOk={deleteBlock}
        onCancel={() => setShowDeleteConfirm(false)}
      >
        {t('deleteBlockTip')}
      </Modal>
    </>
  )
}

export default BlockHeader
