import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import { Button, Collapse, Modal } from 'antd'

import { useResumeStore } from '@/store/resume'

import type { IResumeBlockSetting, IResumeBlockItem } from '@/store/resume'
import type { TextProps } from '@/types'

import TextEditor from '../Text/TextEditor'

export interface BlockEditorProps extends IResumeBlockSetting { }

const BlockEditor: React.FC<BlockEditorProps> = (resume) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState<IResumeBlockItem>({} as IResumeBlockItem)

  const { addResumeBlockItem, updateResumeBlockItem, deleteResumeBlockItem } = useResumeStore()

  const handleAddItem = () => {
    addResumeBlockItem(resume.id)
  }

  const handleDelete = () => {
    deleteResumeBlockItem(resume.id, currentItem.id)
    setShowDeleteConfirm(false)
  }

  const updateItem = (
    newValue: TextProps,
    type: keyof Omit<IResumeBlockItem, 'id'>,
    item: IResumeBlockItem,
  ) => {
    console.log(newValue, type, item)
    updateResumeBlockItem(resume.id, item.id, {
      ...item,
      [type]: {
        ...newValue,
      },
    })
  }

  const renderHeader = (item: IResumeBlockItem) => {
    const handleDeleteIconClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrentItem(item)
      setShowDeleteConfirm(true)
    }

    return (
      <div className="flex items-center justify-between">
        <span>{item.title.value}</span>
        <span><Icon icon="mdi:delete" onClick={handleDeleteIconClick} /></span>
      </div>
    )
  }

  return (
    <div>
      <Modal
        open={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onOk={handleDelete}
      >
        Are you sure you want to delete this item?
      </Modal>
      <Collapse>
        {
          resume.data.items.map((item, i) => (
            <Collapse.Panel header={renderHeader(item)} key={i}>
              <div key={`Item-${i}`}>
                <TextEditor
                  label="Title"
                  onChangeAll={(e: any) => updateItem(e, 'title', item)}
                  {...item.title}
                />
                <TextEditor
                  label="SubTitle"
                  onChangeAll={(e: any) => updateItem(e, 'subtitle', item)}
                  {...item.subtitle!}
                />
                {item.note && <TextEditor
                  label="Note"
                  onChangeAll={(e: any) => updateItem(e, 'note', item)}
                  {...item.note}
                />}
                {item.description && <TextEditor
                  label="Description"
                  onChangeAll={(e: any) => updateItem(e, 'description', item)}
                  {...item.description}
                />}
                {item.detail && <TextEditor
                  label="Detail"
                  onChangeAll={(e: any) => updateItem(e, 'detail', item)}
                  {...item.detail}
                />}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
      <div className="mt-4 text-right">
        <Button type="primary" onClick={handleAddItem}>Add Item</Button>
      </div>
    </div>
  )
}
export default BlockEditor
