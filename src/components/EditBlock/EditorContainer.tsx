import React, { useContext } from 'react'

import { Collapse } from 'antd'

import { AppContext } from '@/App'
import { useAppStore } from '@/store'
import { useResumeStore } from '@/store/resume'

import BlockHeader from './EditorHeader'
import ExpEditor from './ExpEditor'
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
                {
                // eslint-disable-next-line no-nested-ternary
                resume.type === 'exp'
                  ? <ExpEditor {...resume} />
                  : resume.type === 'info'
                  ? <InfoEditor {...resume} />
                  : null
}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </div>
  )
}

export default BlocksContainer
