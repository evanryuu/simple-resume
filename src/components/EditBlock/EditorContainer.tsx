import React, { useContext } from 'react'

import { Collapse } from 'antd'

import { AppContext } from '@/App'
import { useAppStore } from '@/store'
import { useResumeStore } from '@/store/resume'

import BlockEditor from './BlockEditor'
import BlockHeader from './EditorHeader'
import InfoEditor from './InfoEditor'

const BlocksContainer: React.FC = () => {
  const { resumeData } = useResumeStore()
  const { showEdit, setShowEdit } = useAppStore()
  const appContext = useContext(AppContext)

  const handleChange = (keys: string[]) => {
    if (!showEdit) {
      setShowEdit(true)
    }
    appContext.setSelectedEditItem({
      ...appContext.selectedEditItem,
      ids: keys,
    })
  }

  return (
    <div>
      <Collapse
        activeKey={appContext.selectedEditItem?.ids}
        onChange={(key) => handleChange(key as string[])}
        destroyInactivePanel
        ghost
      >
        {
          resumeData.length >= 0 && resumeData.map((resume) => (
            <Collapse.Panel
              header={<BlockHeader {...resume} />}
              key={resume.id}
            >
              <div>
                {resume.type === 'block'
                  ? <BlockEditor {...resume} />
                  : <InfoEditor {...resume} />}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </div>
  )
}

export default BlocksContainer
