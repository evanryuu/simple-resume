import React, { useState } from 'react'

import {
  Button, Card, Drawer, Modal,
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
    addResumeBlock(0)
    setIsModalOpen(false)
  }

  const DrawerHeader = (
    <div className="flex justify-between">
      <span>Edit</span>
      <Button onClick={() => setIsModalOpen(true)}>Add Block</Button>
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
