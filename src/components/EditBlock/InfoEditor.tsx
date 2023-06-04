import React, { useRef } from 'react'

import { Icon } from '@iconify/react'
import {
  Button, message,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store/resume'

import type { IResumeInfoSetting, IResumeInfoItem } from '@/store/resume'
import type { TextProps } from '@/types'

import TextEditor from '../Text/TextEditor'

export interface InfoEditorProps extends IResumeInfoSetting { }

const InfoEditor: React.FC<InfoEditorProps> = (resume) => {
  const avatarInputEl = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const { addResumeInfoItem, deleteResumeInfoItem, setResumeInfoData } = useResumeStore()

  const defaultText: TextProps = {
    value: 'Example',
    icon: 'la:github',
  }

  const handleItemChange = <T extends keyof IResumeInfoItem>(type: T, index: number, value: IResumeInfoItem[T]) => {
    const newItem = resume.data.items[index]
    newItem[type] = value
    setResumeInfoData({
      ...resume.data,
      items: resume.data.items,
    })
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
      message.success('上传成功！')
    }

    // 读取文件数据
    reader.readAsDataURL(file)
  }

  return (
    <div>
      {/* S Name Edit Section */}
      <TextEditor
        type="text"
        label="Name"
        onChange={(e) => setResumeInfoData({
          ...resume.data,
          name: e.target.value,
        })}
        value={resume.data.name}
      />
      {/* E Name Edit Section */}

      {/* S Avatar Edit Section */}
      <div className="avatar-url-container">
        <TextEditor
          label="Avatar"
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setResumeInfoData({
            ...resume.data,
            avatar: e.target.value,
          })}
          value={resume.data.avatar}
          hideMore
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
        resume.data.items.map((item, ii) => (
          <div key={`item-${ii}`}>
            <TextEditor
              key={`Title-${ii}`}
              label="Desc"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleItemChange('value', ii, e.target.value)}
              onIconChange={(icon) => handleItemChange('icon', ii, icon)}
              onIconColorChange={(color) => handleItemChange('iconColor', ii, color)}
              {...item}
            >
              <Button danger className="mt-4" onClick={() => deleteResumeInfoItem(ii)}>
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
