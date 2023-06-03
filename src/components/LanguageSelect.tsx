import React from 'react'

import { Icon } from '@iconify/react'
import { Tooltip } from 'antd'

import { langs } from '@/i18n'
import { useAppStore } from '@/store'

import type { LangType } from '@/store'
import type { TooltipPlacement } from 'antd/es/tooltip'

export interface LanguageSelectProps {
  className?: string
  placement?: TooltipPlacement
}

const LanguageSelect: React.FC<LanguageSelectProps> = (props) => {
  const { className, placement } = props
  const { lang, setLang } = useAppStore()

  const map: { [k in LangType]: string } = {
    zh_CN: '中文',
    en_US: 'English',
  }

  const handleLanguageChange = (l: LangType) => {
    setLang(l)
  }

  const Selector = (
    <div className="flex flex-col justify-center">
      {Object.keys(langs)
        .sort()
        .reverse()
        .map((l: string) => (
          <span
            className="py-2 px-4 cursor-pointer hover:bg-blue-gray-500 transition-colors duration-300"
            key={l}
            role="presentation"
            onClick={() => handleLanguageChange(l as LangType)}
          >
            {map[l as LangType]}
            {lang === l ? ' ✔' : ''}
          </span>
        ))}
    </div>
  )

  return (
    <div className={className}>
      <Tooltip placement={placement || 'bottom'} title={Selector}>
        <Icon icon="la:language" />
        {/* <Selector className="" /> */}
      </Tooltip>
    </div>
  )
}

export default LanguageSelect
