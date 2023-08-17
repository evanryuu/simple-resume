import React from 'react'

import { Icon } from '@iconify/react'
import {
  Button,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store/resume'

import TextEditor from './TextEditor'

import type { IResumeList } from '@/store/resume'

import BaseInput from '../Input/BaseInput'

export interface ListEditorProps extends IResumeList { }

const ListEditor: React.FC<ListEditorProps> = (resume) => {
  const { t } = useTranslation()

  const {
    addResumeListItem, deleteResumeListItem, updateResumeListItem, updateResumeListData,
  } = useResumeStore()

  const handleChange = (column: number) => {
    updateResumeListData(resume.id, {
      column,
    })
  }
  return (
    <div>
      {/* S Column Edit Section */}
      <div>
        <BaseInput
          label={t('column')}
          type="slider"
          value={resume.data.column}
          onChange={(value) => handleChange(value)}
          componentProps={{ min: 1, max: 5 }}
        />
      </div>
      {/* E Column Edit Section */}
      {/* S Items Edit Section */}
      {
        resume.data.items.map((item) => (
          <div key={`item-${item.id}`}>
            <TextEditor
              dataKey="items"
              key={`Title-${item.id}`}
              label={t('desc')}
              onChangeAll={(data) => updateResumeListItem(resume.id, item.id, data)}
              {...item}
              block={resume}
            >
              <Button danger className="mt-4" onClick={() => deleteResumeListItem(resume.id, item.id)}>
                <Icon icon="fluent:delete-28-regular" width={20} />
              </Button>
            </TextEditor>
          </div>
        ))
      }
      {/* E Items Edit Section */}

      <div className="mt-4 flex justify-end">
        <Button type="primary" onClick={() => addResumeListItem(resume.id)}>{t('addItem')}</Button>
      </div>
    </div>
  )
}
export default ListEditor
