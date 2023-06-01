import React, { useState } from 'react'

import { Button, Collapse } from 'antd'

import { useResumeStore } from '@/store/resume'

import type { IResumeBlockSetting } from '@/store/resume'

import TextEditor from '../Text/TextEditor'

export interface BlockEditorProps extends IResumeBlockSetting { }

const BlockEditor: React.FC<BlockEditorProps> = (resume) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { updateResumeBlockData } = useResumeStore()

  const handleAddItem = () => {
  }

  return (
    <div>
      <Button className="mb-4" onClick={handleAddItem}>Add Item</Button>
      <Collapse>
        {
          resume.data.specifics.map((specific, i) => (

            <Collapse.Panel header={specific.title.value} key={i}>
              <div key={`Specific-${i}`}>
                <TextEditor
                  key={`Title-${i}`}
                  label="Title"
                  onChange={(e: any) => console.log(e.target.value)}
                  {...specific.title}
                />
                {specific.subtitle && <TextEditor
                  key={`SubTitle-${i}`}
                  label="SubTitle"
                  onChange={(e: any) => console.log(e.target.value)}
                  {...specific.subtitle}
                />}
                {specific.note && <TextEditor
                  key={`Note-${i}`}
                  label="Note"
                  onChange={(e: any) => console.log(e.target.value)}
                  {...specific.note}
                />}
                {specific.description && <TextEditor
                  key={`Description-${i}`}
                  label="Description"
                  onChange={(e: any) => console.log(e.target.value)}
                  {...specific.description}
                />}
                {specific.detail && <TextEditor
                  key={`Detail-${i}`}
                  label="Detail"
                  onChange={(e: any) => console.log(e.target.value)}
                  {...specific.detail}
                />}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </div>
  )
}
export default BlockEditor
