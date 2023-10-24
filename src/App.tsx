import type { SetStateAction } from 'react'
import {
  createContext, useEffect, useMemo, useState,
} from 'react'

import { Image, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import iconGuideGif from './assets/icon-guide.gif'
import BlocksContainer from './components/EditBlock/EditorContainer'
import EditDrawer from './editContentDrawer'
import EditStyleDrawer from './editStyleDrawer'
import Preview from './pages/home/preview'
import PersistFromModal from './pages/home/components/PersistFromModal'
import { useAppStore, useResumeStore } from './store'

import type {
  IResumeInfo, IResumeExperienceItem, IResumeExperienceData, IResumeInfoData, IResumeListData,
} from './store'

export type SelectedEditItemData = {
  type: Omit<keyof IResumeExperienceData | keyof IResumeExperienceItem, 'id'>
  blockType: 'exp'
  ids: string[]
  blockId: string
  itemId?: string
} | {
  type: Omit<Partial<keyof IResumeInfoData>, 'blockTitle'>
  blockType: 'info'
  ids: string[]
  blockId: string
  itemId?: string
} | {
  type: Omit<Partial<keyof IResumeListData>, 'blockTitle'>
  blockType: 'list'
  ids: string[]
  blockId: string
  itemId?: string
}

export interface IAppContext {
  selectedEditItem: SelectedEditItemData
  setSelectedEditItem: React.Dispatch<SetStateAction<SelectedEditItemData>>
  previewScale: number
  setPreviewScale: (number: number) => void
  showIconGuide: boolean
  setShowIconGuide: (val: boolean) => void
}

export const AppContext = createContext<IAppContext>({} as IAppContext)

function App() {
  const [selectedEditItem, setSelectedEditItem] = useState<SelectedEditItemData>({
    type: '',
    blockType: 'info',
    ids: [],
    blockId: '',
    itemId: '',
  })
  const [previewScale, setPreviewScale] = useState(1)
  const [showIconGuide, setShowIconGuide] = useState(false)
  const [noMoreIconGuide, setNoMoreIconGuide] = useState(false)

  const {
    showEdit, setShowEdit, showEditStyle, setShowEditStyle,
  } = useAppStore()
  const { resumeData, resumeStyle } = useResumeStore()

  const { t } = useTranslation()

  const ctxValue = useMemo(() => ({
    selectedEditItem,
    setSelectedEditItem,
    previewScale,
    setPreviewScale,
    showIconGuide,
    setShowIconGuide,
  }), [selectedEditItem, previewScale])

  useEffect(() => {
    document.title = `${(resumeData.find((r) => r.type === 'info') as IResumeInfo).data.name}'s Resume`
  }, [(resumeData.find((r) => r.type === 'info') as IResumeInfo).data.name])

  useEffect(() => {
    // 当颜色发生变化时，生成新的样式标签
    const styleTag = document.createElement('style')
    styleTag.id = 'code-style'
    styleTag.innerHTML = `
    code { 
      color: #ffffff;
      background-color: ${resumeStyle.themeColor.value}; 
    }
    .editable {
      border-color: ${resumeStyle.themeColor.value};
    }
    .editting {
      border-color: ${resumeStyle.themeColor.value};
      border-width: 1px;
      border-style: dashed;
      cursor: pointer;
    }
    a:hover {
      color: ${resumeStyle.themeColor.value}
    }
    `

    // 移除之前的样式标签
    const prevStyleTag = document.getElementById('code-style')
    if (prevStyleTag) {
      prevStyleTag.remove()
    }

    // 添加新的样式标签
    document.head.appendChild(styleTag)

    return () => {
      // 组件卸载时移除样式标签
      styleTag.remove()
    }
  }, [resumeStyle.themeColor.value])

  const onEditContentDrawerClose = () => {
    setShowEdit(false)
    setSelectedEditItem({} as SelectedEditItemData)
  }

  return (
    <AppContext.Provider value={ctxValue}>
      <Modal
        open={showIconGuide && !noMoreIconGuide}
        okText={t('donShowAgain')}
        onOk={() => setNoMoreIconGuide(true)}
        onCancel={() => setShowIconGuide(false)}
        title={t('shortIconGuide')}
      >
        <div className="flex justify-center">
          <Image className="max-w-screen-md w-1/3" src={iconGuideGif} alt="Icon guide" />
        </div>
      </Modal>
      <PersistFromModal />
      <EditDrawer
        open={showEdit}
        onClose={onEditContentDrawerClose}
      >
        <BlocksContainer />
      </EditDrawer>
      <EditStyleDrawer
        open={showEditStyle}
        onClose={() => setShowEditStyle(false)}
      />
      <Preview />
    </AppContext.Provider>
  )
}

export default App
