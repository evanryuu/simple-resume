import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import { Input, Modal, Tag } from 'antd'

import { useResumeStore } from '@/store/resume'

import type { IResumeBlock } from '@/store/resume'

export type BlockEditorHeaderProps = IResumeBlock

const BlockHeader: React.FC<BlockEditorHeaderProps> = (props) => {
  const { data, type } = props

  const [showBlockNameInput, setShowBlockNameInput] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { deleteResumeBlock, updateResumeBlockData } = useResumeStore()

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
          showBlockNameInput
            ? <Input
              onBlur={() => setShowBlockNameInput(false)}
              onPressEnter={() => setShowBlockNameInput(false)}
              onClick={(e) => e.stopPropagation()}
              value={data.title.value}
              onChange={handleBlockNameChange}
            />
            : (
              <div>
                {data.title.value}
              </div>
            )
        }
        <div className="flex items-center">
          <Tag className="tracking-wider ml-4">{props.type.toUpperCase()}</Tag>
          <span
            role="presentation"
            onClick={handleEditBlockName}
            className="hover:text-cyan flex ml-1 items-center"
          >
            <Icon fontSize={16} icon="mingcute:edit-line" />
          </span>
          {
            type === 'block'
              ? (
                <span
                  role="presentation"
                  onClick={handleDeleteClick}
                  className="text-red hover:text-indigo flex ml-1 items-center"
                >
                  <Icon fontSize={16} icon="fluent:delete-28-regular" />
                </span>
              )
              : null
          }
        </div>
      </div>
      <Modal
        title="Warning"
        open={showDeleteConfirm}
        onOk={deleteBlock}
        onCancel={() => setShowDeleteConfirm(false)}
      >
        Are you sure you want to delete this block?

      </Modal>
    </>
  )
}

export default BlockHeader
