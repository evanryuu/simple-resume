import React, { useState } from 'react'

import {
  Button, Card, Drawer, Modal, message,
} from 'antd'

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
  const { addResumeBlock } = useResumeStore()

  const handleConfirm = () => {
    if (selectedTemplate === -1) {
      message.info('请选择一个模板')
      return
    }
    addResumeBlock(selectedTemplate as 0)
    setIsModalOpen(false)
  }

  const DrawerHeader = (
    <div className="flex justify-between">
      <span>编辑内容</span>
      <Button onClick={() => setIsModalOpen(true)}>添加块</Button>
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
        title="Choose Template"
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      >
        <Card
          className="cursor-pointer focus:border-cyan"
          tabIndex={-1}
          title="Normal"
          onClick={() => setSelectedTemplate(0)}
          style={{ width: 300 }}
        >
          Template 0
        </Card>

      </Modal>
    </>
  )
}

export default EditDrawer
