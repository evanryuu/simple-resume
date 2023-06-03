import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import { Input, Modal, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store/resume'

import type { IResumeBlock } from '@/store/resume'

import HoverChangeColor from '../Hover'

export type BlockEditorHeaderProps = IResumeBlock

const BlockHeader: React.FC<BlockEditorHeaderProps> = (props) => {
  const { data, type } = props
  const { t } = useTranslation()

  const [showBlockNameInput, setShowBlockNameInput] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { deleteResumeBlock, updateResumeBlockData, moveResumeBlock } = useResumeStore()

  const handleBlockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateResumeBlockData(props.id, {
      title: {
        value: e.target.value,
      },
    })
  }

  const handleEditBlockName = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setShowBlockNameInput(!showBlockNameInput)
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
    console.log('delete', props)
    deleteResumeBlock(props.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div
        role="presentation"
        className="flex justify-between items-center cursor-pointer"
      >
        {
          showBlockNameInput && props.type === 'block'
            ? <Input
              onBlur={() => setShowBlockNameInput(false)}
              onPressEnter={() => setShowBlockNameInput(false)}
              onClick={(e) => e.stopPropagation()}
              value={data.title.value}
              onChange={handleBlockNameChange}
            />
            : (
              <div>
                {props.type === 'block' ? data.title.value : t('personalInfo')}
              </div>
            )
        }
        <div className="flex items-center">
          <Tag className="tracking-wider ml-4">{props.type.toUpperCase()}</Tag>
          {
            type === 'block'
              ? (
                <>
                  <HoverChangeColor>
                    <span
                      role="presentation"
                      onClick={handleEditBlockName}
                      className="flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="mingcute:edit-line" />
                    </span>
                  </HoverChangeColor>
                  <HoverChangeColor>

                    <span
                      role="presentation"
                      onClick={handleMoveBlock}
                      className="flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="fluent:arrow-up-16-regular" />
                    </span>
                  </HoverChangeColor>
                  <HoverChangeColor>
                    <span
                      role="presentation"
                      onClick={handleDeleteClick}
                      className="text-red flex ml-1 items-center"
                    >
                      <Icon fontSize={16} icon="fluent:delete-28-regular" />
                    </span>
                  </HoverChangeColor>
                </>
              )
              : null
          }
        </div>
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
