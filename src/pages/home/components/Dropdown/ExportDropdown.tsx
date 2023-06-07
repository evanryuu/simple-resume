import React, { useContext } from 'react'

import { Dropdown } from 'antd'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import { useTranslation } from 'react-i18next'

import { useResumeStore } from '@/store'

import type { IResumeInfoSetting } from '@/store'
import type { MenuProps, DropdownProps } from 'antd'

import { PreviewContext } from '../../preview'

const ExportDropdown: React.FC<DropdownProps> = (props) => {
  const { t } = useTranslation()
  const { printResume, previewRef } = useContext(PreviewContext)
  const { resumeStyle, resumeData } = useResumeStore()

  const exportPicPdf = () => {
    html2pdf()
      .set({
        margin: resumeStyle.pagePadding.value / 4,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2.5 },
        pagebreak: { avoid: 'span ' },
      })
      .from(previewRef.current)
      .save(`${(resumeData.find((r) => r.type === 'info') as IResumeInfoSetting).data.name}'s Resume.pdf`)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          role="presentation"
          className="font-semibold flex items-center"
          style={{
            color: resumeStyle.themeColor.value,
          }}
        >{t('exportPDF')}
        </div>
      ),
      onClick: printResume,
    },
    {
      key: '2',
      label: (
        <div
          className="text-bluegray"
          role="presentation"
        >{t('exportPicturePDF')}
        </div>
      ),
      onClick: exportPicPdf,
    },
  ]

  return (
    <Dropdown {...props} menu={{ items }}>
      <span className="cursor-pointer">{t('export')}</span>
    </Dropdown>
  )
}

export default ExportDropdown
