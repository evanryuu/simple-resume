import React from 'react'

import {
  Button, Modal, Form, Input,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { usePersistStore } from '@/store'

const PersistFromModal: React.FC = () => {
  const {
    showStorageContextForm,
    setShowStorageContextForm,
    onlineStorageContext,
    setOnlineStorageContext,
  } = usePersistStore()

  const { t } = useTranslation()

  const [form] = Form.useForm()
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } }

  const onFinish = (values: any) => {
    console.log(values)
    setOnlineStorageContext({ ...values })
    setShowStorageContextForm(false)
  }

  return (
    <div>
      <Modal
        title={t('resumePersistConfig')}
        open={showStorageContextForm}
        onCancel={() => setShowStorageContextForm(false)}
        footer={null}
      >
        <Form
          {...formItemLayout}
          layout="horizontal"
          form={form}
          initialValues={{ ...onlineStorageContext }}
          onFinish={onFinish}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
        >
          <Form.Item>
            <a
              className="flex-shrink-0 ml-2 text-gray-400 underline-current underline"
              target="_blank"
              href={`${t('howToCreateGithubTokenDocUrl')}`}
              rel="noreferrer"
            >
              {t('howToCreateGithubToken')}
            </a>
          </Form.Item>

          <Form.Item label={t('resumePersistToken')} name="token" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={t('resumePersistOwner')} name="owner" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={t('resumePersistRepo')} name="repo" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">{t('submit')}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PersistFromModal
