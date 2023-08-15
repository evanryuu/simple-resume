import React, { useContext, useState } from 'react'

import { Icon } from '@iconify/react'
import { Button, Collapse, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import { AppContext } from '@/App'
import { useAppStore } from '@/store'
import { useResumeStore } from '@/store/resume'

import TextEditor from './TextEditor'

import type { IResumeExperience, IResumeExperienceItem } from '@/store/resume'
import type { TextProps } from '@/types'

import HoverChangeColor from '../Hover'

export interface BlockEditorProps extends IResumeExperience { }

const BlockEditor: React.FC<BlockEditorProps> = (resume) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState<IResumeExperienceItem>({} as IResumeExperienceItem)

  const { t } = useTranslation()

  const appContext = useContext(AppContext)
  const { showEdit, setShowEdit } = useAppStore()
  const {
    addResumeBlockItem, updateResumeBlockItem, deleteResumeBlockItem, moveResumeBlockItem,
  } = useResumeStore()

  const handleAddItem = () => {
    addResumeBlockItem(resume.id)
  }

  const handleDelete = () => {
    deleteResumeBlockItem(resume.id, currentItem.id)
    setShowDeleteConfirm(false)
  }

  const updateItem = (
    newValue: TextProps,
    type: keyof Omit<IResumeExperienceItem, 'id'>,
    item: IResumeExperienceItem,
  ) => {
    updateResumeBlockItem(resume.id, item.id, {
      ...item,
      [type]: {
        ...newValue,
      },
    })
  }

  const renderHeader = (item: IResumeExperienceItem) => {
    const handleDeleteIconClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrentItem(item)
      setShowDeleteConfirm(true)
    }

    const handleMoveBlockItem = (e: React.MouseEvent) => {
      e.stopPropagation()
      moveResumeBlockItem(resume.id, item.id, -1)
    }

    return (
      <div className="flex items-center justify-between">
        <span>{item.title.value}</span>
        <div className="flex items-center">
          <HoverChangeColor>
            <span
              role="presentation"
              onClick={handleMoveBlockItem}
              className="flex ml-1 items-center"
            >
              <Icon fontSize={16} icon="fluent:arrow-up-16-regular" />
            </span>
          </HoverChangeColor>
          <span className="text-red flex items-center ml-1"><Icon icon="fluent:delete-28-regular" onClick={handleDeleteIconClick} /></span>
        </div>
      </div>
    )
  }

  const handlePanelChange = (ids: string[]) => {
    if (!showEdit) {
      setShowEdit(true)
    }
    appContext.setSelectedEditItem({
      ...appContext.selectedEditItem,
      ids,
    })
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
      <Collapse activeKey={appContext.selectedEditItem.ids} onChange={(key) => handlePanelChange(key as string[])}>
        {
          resume.data.items.map((item, i) => (
            <Collapse.Panel header={renderHeader(item)} key={item.id}>
              <div key={`Item-${i}`}>
                <TextEditor
                  dataKey="title"
                  id={item.id}
                  block={resume}
                  label={t('title')}
                  onChangeAll={(e: any) => updateItem(e, 'title', item)}
                  {...item.title}
                />
                <TextEditor
                  dataKey="subtitle"
                  block={resume}
                  id={item.id}
                  label={t('subtitle')}
                  onChangeAll={(e: any) => updateItem(e, 'subtitle', item)}
                  {...item.subtitle!}
                />
                {item.note && <TextEditor
                  dataKey="note"
                  block={resume}
                  id={item.id}
                  label={t('note')}
                  onChangeAll={(e: any) => updateItem(e, 'note', item)}
                  {...item.note}
                />}
                {item.description && <TextEditor
                  type="textarea"
                  dataKey="description"
                  block={resume}
                  id={item.id}
                  label={t('description')}
                  onChangeAll={(e: any) => updateItem(e, 'description', item)}
                  {...item.description}
                />}
                {item.detail && <TextEditor
                  type="textarea"
                  dataKey="detail"
                  block={resume}
                  id={item.id}
                  label={t('detail')}
                  onChangeAll={(e: any) => updateItem(e, 'detail', item)}
                  {...item.detail}
                />}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
      <div className="mt-4 text-right">
        <Button type="primary" onClick={handleAddItem}>{t('addItem')}</Button>
      </div>
    </div>
  )
}
export default BlockEditor
