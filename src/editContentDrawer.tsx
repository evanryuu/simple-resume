import React, { useState } from 'react'

import {
  Button, Card, Drawer, Image, Modal, message,
} from 'antd'
import { useTranslation } from 'react-i18next'

import expImg from '@/assets/exp.png'
import listImg from '@/assets/list.png'

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

  const BLOCK_TYPES = [
    {
      type: 'exp',
      img: expImg,
    },
    {
      type: 'list',
      img: listImg,
    },
  ] as {type: BlockType, img: string}[]

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
        title={t('chooseBlock')}
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      >
        {
          BLOCK_TYPES.map((block) => (
            <Card
              key={block.type}
              className="cursor-pointer my-8"
              tabIndex={-1}
              title={t(block.type)}
              onClick={() => setSelectedType(block.type)}
              style={{
              width: 300,
              borderColor: selectedType === block.type ? resumeStyle.themeColor.value : '#ccc',
            }}
            >
              <Image src={block.img} />
            </Card>
          ))
        }
      </Modal>
    </>
  )
}

export default EditDrawer
