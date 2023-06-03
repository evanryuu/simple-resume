import React, { useState } from 'react'

import {
  Button, Card, Drawer, Modal, message,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from './store/resume'

import type { DrawerProps } from 'antd'

export interface EditDrawerProps extends DrawerProps {

}

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const {
    open, onClose, children, ...rest
  } = props

  const [selectedTemplate, setSelectedTemplate] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  const { addResumeBlock, resumeStyle } = useResumeStore()

  const handleConfirm = () => {
    if (selectedTemplate === -1) {
      message.info('请选择一个模板')
      return
    }
    addResumeBlock(selectedTemplate as 0)
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
        mask
        maskStyle={{
          backgroundColor: 'transparent',
        }}
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
        <Card
          className="cursor-pointer my-8"
          tabIndex={-1}
          title={t('default')}
          onClick={() => setSelectedTemplate(selectedTemplate === 0 ? -1 : 0)}
          style={{
            width: 300,
            borderColor: selectedTemplate === 0 ? resumeStyle.themeColor : '#ccc',
          }}
        >
          {t('template')} 0
        </Card>

      </Modal>
    </>
  )
}

export default EditDrawer
