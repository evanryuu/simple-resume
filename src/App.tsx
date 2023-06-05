import type { SetStateAction } from 'react'
import {
  createContext, useEffect, useMemo, useState,
} from 'react'

import BlocksContainer from './components/EditBlock/EditorContainer'
import EditDrawer from './editContentDrawer'
import EditStyleDrawer from './editStyleDrawer'
import Preview from './pages/home/preview'
import { useAppStore, useResumeStore } from './store'

import type {
  IResumeInfoSetting, IResumeBlockItem, IResumeBlockData, IResumeInfoData,
} from './store'

import './App.css'

export type SelectedEditItemData = {
  type: Omit<keyof IResumeBlockData | keyof IResumeBlockItem, 'id'>
  blockType: 'block'
  ids: string[]
  blockId: string
  itemId?: string
} | {
  type: Partial<keyof IResumeInfoData>
  blockType: 'info'
  ids: string[]
  blockId: string
  itemId?: string
}

export interface IAppContext {
  selectedEditItem: SelectedEditItemData
  setSelectedEditItem: React.Dispatch<SetStateAction<SelectedEditItemData>>
}

export const AppContext = createContext<IAppContext>({} as IAppContext)

function App() {
  const [selectedEditItem, setSelectedEditItem] = useState<SelectedEditItemData>({} as SelectedEditItemData)

  const {
    showEdit, setShowEdit, showEditStyle, setShowEditStyle,
  } = useAppStore()
  const { resumeData, resumeStyle } = useResumeStore()

  const ctxValue = useMemo(() => ({
    selectedEditItem,
    setSelectedEditItem,
  }), [selectedEditItem])

  useEffect(() => {
    document.title = `${(resumeData.find((r) => r.type === 'info') as IResumeInfoSetting).data.name}'s Resume`
  }, [(resumeData.find((r) => r.type === 'info') as IResumeInfoSetting).data.name])

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
