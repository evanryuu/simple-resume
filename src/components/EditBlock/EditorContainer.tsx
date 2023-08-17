import React, { useContext } from 'react'

import { Collapse } from 'antd'

import { AppContext } from '@/App'
import { useAppStore } from '@/store'
import { useResumeStore } from '@/store/resume'

import BlockHeader from './EditorHeader'
import ExpEditor from './ExpEditor'
import InfoEditor from './InfoEditor'
import ListEditor from './ListEditor'

import type {
  IResumeBlock, IResumeExperience, IResumeInfo, IResumeList,
} from '@/store/resume'

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

  const genEditor = (resume: IResumeBlock) => {
    const map = {
      exp: <ExpEditor {...resume as IResumeExperience} />,
      info: <InfoEditor {...resume as IResumeInfo} />,
      list: <ListEditor {...resume as IResumeList} />,
    }
    return map[resume.type]
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
                {genEditor(resume)}
              </div>
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </div>
  )
}

export default BlocksContainer
