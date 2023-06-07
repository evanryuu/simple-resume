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
        <span role="presentation" className="!rounded-none">
          {t('editContent')}
        </span>
      ),
      onClick: () => setShowEdit(true),
    },
    {
      key: '2',
      label: (
        <span role="presentation" className="mt-4">
          {t('editStyle')}
        </span>

      ),
      onClick: () => setShowEditStyle(true),
    },
  ]

  return (
    <Dropdown {...props} menu={{ items }}>
      <span className="cursor-pointer">{t('edit')}</span>
    </Dropdown>
  )
}

export default EditDropdown
