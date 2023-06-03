import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LangType = 'en_US' | 'zh_CN'

interface IAppState {
  lang: LangType
  setLang: (lang: LangType) => void

  darkMode: boolean,
  setDarkMode: (val: boolean) => void,

  previewMode: boolean
  setPreviewMode: (gotoPreview: boolean) => void

  showEdit: boolean
  setShowEdit: (showEdit: boolean) => void

  showEditStyle: boolean,
  setShowEditStyle: (showEdit: boolean) => void
}

export const useAppStore = create<IAppState>()(
  persist(
    (set, get) => ({
      lang: 'zh_CN',
      setLang: (val) => set(() => ({ lang: val })),

      darkMode: false,
      setDarkMode: (val) => set(() => ({ darkMode: val })),

      previewMode: false,
      setPreviewMode: (gotoPreview: boolean) => set(() => ({ previewMode: gotoPreview })),

      showEdit: false,
      setShowEdit: (showEdit: boolean) => set(() => ({ showEdit })),

      showEditStyle: false,
      setShowEditStyle: (showEditStyle: boolean) => set(() => ({ showEditStyle })),
    }),
    {
      name: 'app_settings',
    },
  ),
)
