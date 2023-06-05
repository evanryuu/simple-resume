import React from 'react'

import { Collapse } from 'antd'

import { useResumeStore } from '@/store/resume'

import BlockEditor from './BlockEditor'
import BlockHeader from './EditorHeader'
import InfoEditor from './InfoEditor'

const BlocksContainer: React.FC = () => {
  const { resumeData } = useResumeStore()

  return (
    <div>
      <Collapse ghost>
        {
          resumeData.length >= 0 && resumeData.map((resume, i) => (
            <Collapse.Panel header={<BlockHeader {...resume} />} key={String(i)}>
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
