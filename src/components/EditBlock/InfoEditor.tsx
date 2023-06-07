import React, { useRef } from 'react'

import { Icon } from '@iconify/react'
import {
  Button, message,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store/resume'

import TextEditor from './TextEditor'

import type { IResumeInfoSetting } from '@/store/resume'
import type { TextProps } from '@/types'

export interface InfoEditorProps extends IResumeInfoSetting { }

const InfoEditor: React.FC<InfoEditorProps> = (resume) => {
  const avatarInputEl = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const {
    addResumeInfoItem, deleteResumeInfoItem, setResumeInfoData, updateResumeInfoItem,
  } = useResumeStore()

  const defaultText: TextProps = {
    value: 'Example',
    icon: 'la:github',
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 获取选择的文件
    const file = event.target.files![0]
    // 创建一个FileReader对象
    const reader = new FileReader()

    // 当文件加载完成时触发
    reader.onload = function (e) {
      // 将读取的数据赋值给<img>标签的src属性
      setResumeInfoData({
        ...resume.data,
        avatar: e.target!.result as string,
      })
      message.success(t('success'))
    }

    // 读取文件数据
    reader.readAsDataURL(file)
  }

  return (
    <div>
      {/* S Name Edit Section */}
      <TextEditor
        type="text"
        dataKey="name"
        label={t('name')}
        onChange={(e) => setResumeInfoData({
          ...resume.data,
          name: e.target.value,
        })}
        hideMore
        value={resume.data.name}
        block={resume}
      />
      {/* E Name Edit Section */}

      {/* S Avatar Edit Section */}
      <div className="avatar-url-container">
        <TextEditor
          label={t('avatar')}
          dataKey="avatar"
          onChange={(e) => setResumeInfoData({
            ...resume.data,
            avatar: e.target.value,
          })}
          value={resume.data.avatar}
          hideMore
          block={resume}
        >
          <div className="mt-4">
            <Button onClick={() => avatarInputEl.current?.click()}>Upload</Button>
            <input
              ref={avatarInputEl}
              className="hidden"
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </TextEditor>
      </div>
      {/* E Avatar Edit Section */}

      {/* S Items Edit Section */}
      {
        resume.data.items.map((item) => (
          <div key={`item-${item.id}`}>
            <TextEditor
              dataKey="items"
              key={`Title-${item.id}`}
              label={t('desc')}
              // onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleItemChange('value', item.id, e.target.value)}
              onChangeAll={(data) => updateResumeInfoItem(item.id, data)}
              // onIconChange={(icon) => handleItemChange('icon', item.id, icon)}
              // onIconColorChange={(color) => handleItemChange('iconColor', item.id, color)}
              {...item}
              block={resume}
            >
              <Button danger className="mt-4" onClick={() => deleteResumeInfoItem(item.id)}>
                <Icon icon="fluent:delete-28-regular" width={20} />
              </Button>
            </TextEditor>
          </div>
        ))
      }
      {/* E Items Edit Section */}

      <div className="mt-4 flex justify-end">
        <Button type="primary" onClick={() => addResumeInfoItem(defaultText)}>{t('addItem')}</Button>
      </div>
    </div>
  )
}
export default InfoEditor
