import React, { useState } from 'react'

import { Icon } from '@iconify/react'
import {
  Button, Upload, message,
} from 'antd'

import { useResumeStore } from '@/store/resume'

import type { IResumeInfoSetting, IResumeInfoItem } from '@/store/resume'
import type { TextProps } from '@/types'
import type { UploadProps } from 'antd'

import TextEditor from '../Text/TextEditor'

export interface InfoEditorProps extends IResumeInfoSetting { }

const InfoEditor: React.FC<InfoEditorProps> = (resume) => {
  const [imgUrl, setImgUrl] = useState('')
  const { addResumeInfoItem, deleteResumeInfoItem, setResumeInfoData } = useResumeStore()

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      // URL.createObjectURL(info.file)
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

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
            <Upload {...uploadProps}><Button>Upload</Button></Upload>
          </div>
        </TextEditor>
      </div>
      {/* E Avatar Edit Section */}

      {/* S Column Edit Section */}
      <TextEditor
        label="Column"
        type="number"
        onChange={(value: number) => setResumeInfoData({
          ...resume.data,
          column: value,
        })}
        value={resume.data.column}
        hideMore
      />
      {/* E Column Edit Section */}

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
        <Button type="primary" onClick={() => addResumeInfoItem(defaultText)}>Add Item</Button>
      </div>
    </div>
  )
}
export default InfoEditor
