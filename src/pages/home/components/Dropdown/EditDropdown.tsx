import React from 'react'

import { Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'

import { useAppStore } from '@/store'

import type { MenuProps, DropdownProps } from 'antd'

const EditDropdown: React.FC<DropdownProps> = (props) => {
  const { t } = useTranslation()
  const { setShowEdit, setShowEditStyle } = useAppStore()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span role="presentation" className="!rounded-none" onClick={() => setShowEdit(true)}>
          {t('editContent')}
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span role="presentation" className="mt-4" onClick={() => setShowEditStyle(true)}>
          {t('editStyle')}
        </span>

      ),
    },
  ]

  return (
    <Dropdown {...props} menu={{ items }}>
      <span className="cursor-pointer">{t('edit')}</span>
    </Dropdown>
  )
}

export default EditDropdown
