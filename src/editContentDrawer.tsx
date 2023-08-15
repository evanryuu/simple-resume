import React, { useState } from 'react'

import {
  Button, Card, Drawer, Modal, message,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from './store/resume'

import type { BlockType } from './store/resume'
import type { DrawerProps } from 'antd'

export interface EditDrawerProps extends DrawerProps {

}

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const {
    open, onClose, children, ...rest
  } = props

  const [selectedType, setSelectedType] = useState<BlockType>('exp' as BlockType)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  const { addResumeBlock, resumeStyle } = useResumeStore()

  const BLOCK_TYPES = ['exp', 'list'] as BlockType[]

  const handleConfirm = () => {
    if (selectedType === undefined) {
      message.info(t('plsChooseTemp'))
      return
    }
    addResumeBlock(selectedType)
    setIsModalOpen(false)
  }

  const DrawerHeader = (
    <div className="flex justify-between items-center">
      <span>{t('editContent')}</span>
      <Button onClick={() => setIsModalOpen(true)}>{t('addBlock')}</Button>
    </div>
  )

  return (
    <>
      <Drawer
        title={DrawerHeader}
        placement="left"
        mask={false}
        open={open}
        onClose={onClose}
        {...rest}
      >
        {children}
      </Drawer>
      <Modal
        title={t('chooseTemplate')}
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      >
        {
          BLOCK_TYPES.map((blockType) => (
            <Card
              key={blockType}
              className="cursor-pointer my-8"
              tabIndex={-1}
              title={t('default')}
              onClick={() => setSelectedType(blockType)}
              style={{
              width: 300,
              borderColor: selectedType === blockType ? resumeStyle.themeColor.value : '#ccc',
            }}
            >
              {t(blockType)}
            </Card>
          ))
        }
      </Modal>
    </>
  )
}

export default EditDrawer
