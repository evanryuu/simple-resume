import React, { useContext, useState } from 'react'

import { Icon } from '@iconify/react'
import { Button, Collapse, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import { AppContext } from '@/App'
import { useAppStore } from '@/store'
import { useResumeStore } from '@/store/resume'

import type { IResumeBlockSetting, IResumeBlockItem } from '@/store/resume'
import type { TextProps } from '@/types'

import TextEditor from '../Text/TextEditor'

export interface BlockEditorProps extends IResumeBlockSetting { }

const BlockEditor: React.FC<BlockEditorProps> = (resume) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentItem, setCurrentItem] = useState<IResumeBlockItem>({} as IResumeBlockItem)

  const { t } = useTranslation()

  const appContext = useContext(AppContext)
  const { showEdit, setShowEdit } = useAppStore()
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
        <span className="text-red"><Icon icon="fluent:delete-28-regular" onClick={handleDeleteIconClick} /></span>
      </div>
    )
  }

  const handlePanelChange = (ids: string[]) => {
    console.log(ids)
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
                  label={t('title')}
                  onChangeAll={(e: any) => updateItem(e, 'title', item)}
                  {...item.title}
                />
                <TextEditor
                  dataKey="subtitle"
                  id={item.id}
                  label={t('subtitle')}
                  onChangeAll={(e: any) => updateItem(e, 'subtitle', item)}
                  {...item.subtitle!}
                />
                {item.note && <TextEditor
                  dataKey="note"
                  id={item.id}
                  label={t('note')}
                  onChangeAll={(e: any) => updateItem(e, 'note', item)}
                  {...item.note}
                />}
                {item.description && <TextEditor
                  type="textarea"
                  dataKey="description"
                  id={item.id}
                  label={t('description')}
                  onChangeAll={(e: any) => updateItem(e, 'description', item)}
                  {...item.description}
                />}
                {item.detail && <TextEditor
                  type="textarea"
                  dataKey="detail"
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
