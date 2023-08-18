import { message } from 'antd'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import constant from '@/config/constant'
import TemplateData from '@/config/template.json'
import i18nInstance from '@/i18n'
import { generateRandomId, initTemplateData } from '@/utils'
import { genBlock } from '@/utils/block'
import { getRandom } from '@/utils/utils'

import type { BaseInputType, Color, TextProps } from '@/types'

// TODO remove template
export type TemplateType = 0
export type ThemePreset = 0 | 1
export type BlockType = 'info' | 'exp' | 'list'

/** S IResumeExperience */
export interface IResumeExperienceItem {
  id: string
  title: TextProps
  subtitle?: TextProps
  note?: TextProps
  description?: TextProps
  detail?: TextProps
}

export interface IResumeExperienceData {
  blockTitle: TextProps & {
    value: string
  }
  items: IResumeExperienceItem[]
}

export interface IResumeExperience {
  type: 'exp'
  id: string
  template: TemplateType
  data: IResumeExperienceData
}
/** E IResumeExperience */

/** S IResumeInfo */
export type IResumeInfoItem = (TextProps & { id: string })

export interface IResumeInfoData {
  blockTitle: { value: string }
  name: string
  avatar: string
  items: IResumeInfoItem[]
}

export interface IResumeInfo {
  type: 'info'
  id: string
  template: TemplateType
  data: IResumeInfoData
}
/** E IResumeInfo */

/** S IResumeList */
export type IResumeListItem = (TextProps & { id: string })

export interface IResumeListData {
  blockTitle: TextProps & {
    value: string
  }
  column: number
  items: IResumeListItem[]
}
export interface IResumeList {
  type: 'list'
  id: string
  template: TemplateType
  data: IResumeListData
}
/** E IResumeList */

export type IResumeBlock = IResumeExperience | IResumeInfo | IResumeList

export type IResumeData = IResumeBlock[]

export interface IResumeStyle {
  themeColor: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
  infoDescMarginTop: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  avatarWidth: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  avatarRounded: {
    type: BaseInputType
    value: boolean
    componentProps: any
  }
  infoItemsColumn: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  lineBelowInfo: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
  pagePadding: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  titleSize: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  titleStyle: {
    type: BaseInputType
    value: 'banner' | 'text' | 'tag',
    componentProps: any
  }
  subtitleSize: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  subtitleColor: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
  subtitleBackgroundColor: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
  blockHeaderSize: {
    type: BaseInputType
    value: number
    componentProps: any
  }

  noteSize: {
    type: BaseInputType
    value: number
    componentProps: any
  }
  noteColor: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
  noteBackgroundColor: {
    type: BaseInputType
    value: Color
    componentProps: any
  }
}

interface IResumeState {
  resetResumeSettings: () => void

  resumeStyle: IResumeStyle
  setResumeStyle: (style: IResumeStyle) => void

  // date & blocks
  resumeData: IResumeData
  setResumeData: (resumes: IResumeBlock[]) => void
  moveResumeBlock: (id: string, moveto: number) => void
  addResumeBlock: (blockType: BlockType) => void
  deleteResumeBlock: (id: string) => void

  // resume info methods
  setResumeInfoData: (resumeInfo: IResumeInfoData) => void
  updateResumeInfoData: (id: string, resumeInfoData: IResumeInfoData) => void
  updateResumeInfoItem: (itemId: string, item?: Partial<IResumeInfoItem>) => void
  addResumeInfoItem: (item: TextProps) => void
  deleteResumeInfoItem: (index: string) => void

  // resume exp methods
  setResumeExpData: (id: string, blockData: IResumeExperienceData) => void
  updateResumeExpData: (id: string, blockData: Partial<IResumeExperienceData>) => void
  updateResumeExpItem: (blockId: string, itemId: string, item?: Partial<IResumeExperienceItem>) => void
  addResumeExpItem: (blockId: string, item?: IResumeExperienceItem) => void
  deleteResumeExpItem: (blockId: string, itemId: string) => void
  moveResumeExpItem: (blockId: string, itemId: string, moveto: number) => void

  // resume list methods
  setResumeListData: (id: string, blockData: IResumeListData) => void
  updateResumeListData: (id: string, blockData: Partial<IResumeListData>) => void
  updateResumeListItem: (blockId: string, itemId: string, item?: Partial<IResumeListItem>) => void
  addResumeListItem: (blockId: string, item?: IResumeListItem) => void
  deleteResumeListItem: (blockId: string, itemId: string) => void
  moveResumeListItem: (blockId: string, itemId: string, moveto: number) => void

}

export const useResumeStore = create<IResumeState>()(
  persist(
    (set, get) => ({
      resetResumeSettings: () => set(() => ({
        resumeStyle: TemplateData.state.resumeStyle as IResumeStyle,
        resumeData: TemplateData.state.resumeData as IResumeData,
      })),

      resumeStyle: initTemplateData().state.resumeStyle,
      setResumeStyle: (style) => set(() => ({ resumeStyle: style })),

      resumeData: initTemplateData().state.resumeData,
      /** Set whole resume data, including ResumeInfo and ResumeBlock */
      setResumeData: (resumes) => set(() => ({ resumeData: resumes })),
      moveResumeBlock: (id, moveto) => set(() => {
        const state = get()
        const { resumeData } = state
        const targetIndex = resumeData.findIndex((r) => r.id === id)!
        const newIndex = targetIndex + moveto
        /**
         * <= 0 not < 0
         *
         * because info block needs to be the first.
         *
         * this might change in the future thought (lol)
         */
        if (newIndex <= 0) {
          message.info(i18nInstance.t('noMoreUp'))
          return { ...state }
        } if (newIndex >= resumeData.length) {
          message.info(i18nInstance.t('noMoreBottom'))
          return { ...state }
        }
        const el = resumeData.splice(targetIndex, 1)[0]
        resumeData.splice(newIndex, 0, el)

        return { resumeData }
      }),
      addResumeBlock: (blockType: BlockType) => set(() => {
        const state = get()

        const newBlock = genBlock(blockType)

        return {
          ...state,
          resumeData: [
            ...state.resumeData,
            newBlock,
          ],
        }
      }),
      deleteResumeBlock: (id) => set(() => {
        const state = get()

        const targetIndex = state.resumeData.findIndex((block) => block.id === id)
        if (targetIndex !== -1) {
          state.resumeData.splice(targetIndex, 1)
        }
        return { ...state }
      }),

      // TODO simplify info/exp/list methods

      /** S info methods */
      setResumeInfoData: (resume) => set(() => {
        const state = get()
        const infoIndex = state.resumeData.findIndex((r) => r.type === 'info')!
        if (infoIndex !== -1) {
          state.resumeData.splice(infoIndex, 1)
          state.resumeData.unshift({
            type: 'info',
            id: generateRandomId(8),
            template: 0,
            data: resume,
          })
        }
        return { ...state }
      }),
      updateResumeInfoData: (id, resumeInfoData) => set(() => {
        const state = get()
        const targetBlock = state.resumeData.find((r) => r.id === id)
        if (targetBlock?.type === 'info') {
          targetBlock!.data = {
            ...targetBlock!.data,
            ...resumeInfoData,
          }
        }
        return { ...state }
      }),
      updateResumeInfoItem: (itemId, item) => set(() => {
        const state = get()

        const { resumeData } = state
        const info = resumeData.find((r) => r.type === 'info') as IResumeInfo

        const targetIndex = info.data.items.findIndex((i) => i.id === itemId)
        const target = info.data.items[targetIndex]

        if (targetIndex !== -1) {
          info.data.items.splice(targetIndex, 1, {
            ...target,
            ...item,
          })
        }

        return { ...state }
      }),
      addResumeInfoItem: (item: TextProps) => set(() => {
        const state = get()

        const info = state.resumeData.find((resume) => resume.type === 'info')!
        if (info.type === 'info') {
          info.data.items.push({
            ...item,
            id: generateRandomId(9),
          })
        }
        return { ...state }
      }),
      deleteResumeInfoItem: (itemId) => set(() => {
        const state = get()

        const info = state.resumeData.find((resume) => resume.type === 'info')!
        if (info.type === 'info') {
          const targetIndex = info.data.items.findIndex((i) => i.id === itemId)
          info.data.items.splice(targetIndex, 1)
        }
        return { ...state }
      }),
      /** E info methods */

      /** S exp methods */
      setResumeExpData: (id, blockData) => set(() => {
        const state = get()
        const targetBlock = state.resumeData.find((r) => r.id === id)
        targetBlock!.data = {
          ...targetBlock!.data,
          ...blockData,
        }
        return { ...state }
      }),
      updateResumeExpData: (id, blockData) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((r) => r.id === id)
        if (targetBlock?.type === 'exp') {
          targetBlock!.data = {
            ...targetBlock!.data,
            ...blockData,
          }
        }
        return { ...state }
      }),
      updateResumeExpItem: (blockId, itemId, item) => set(() => {
        const state = get()

        const block = state.resumeData.find((b) => b.id === blockId) as IResumeExperience
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!

        if (targetIndex !== -1) {
          if (item === undefined) {
            block.data.items.splice(targetIndex, 1)
          } else {
            block.data.items.splice(targetIndex, 1, {
              ...block.data.items[targetIndex],
              ...item,
            })
          }
        }
        return { ...state }
      }),
      addResumeExpItem: (blockId, specific) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((b) => b.id === blockId) as IResumeExperience
        const id = generateRandomId(10)
        if (specific) {
          targetBlock.data.items.push({
            ...specific,
            id,
          })
        } else {
          targetBlock.data.items.push({
            id,
            title: {
              value: `Experience-${id}`,
            },
            subtitle: {
              value: `SubTitle-${id}`,
            },
            note: {
              value: `Note-${id}`,
            },
            description: {
              value: `description-${id}`,
            },
            detail: {
              value: `detail-${id}`,
            },
          })
        }

        return { ...state }
      }),
      moveResumeExpItem: (blockId, itemId, moveto) => set(() => {
        const state = get()

        const { resumeData } = state
        const targetBlock = resumeData.find((r) => r.id === blockId)!
        const targetIndex = targetBlock.data.items.findIndex((i) => i.id === itemId)!
        const newIndex = targetIndex + moveto

        if (newIndex < 0) {
          message.info(i18nInstance.t('noMoreUp'))
          return { ...state }
        } if (newIndex >= targetBlock.data.items.length) {
          message.info(i18nInstance.t('noMoreBottom'))
          return { ...state }
        }
        const el = targetBlock.data.items.splice(targetIndex, 1)[0]
        targetBlock.data.items.splice(newIndex, 0, el as IResumeExperienceItem)

        return { resumeData }
      }),
      deleteResumeExpItem: (blockId, itemId) => set(() => {
        const state = get()

        const { resumeData } = state
        const block = resumeData.find((b) => b.id === blockId)!
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!
        block.data.items.splice(targetIndex, 1)
        return { ...state }
      }),
      /** E exp methods */

      /** S list methods */
      setResumeListData: (id, blockData) => set(() => {
        const state = get()
        const targetBlock = state.resumeData.find((r) => r.id === id)
        targetBlock!.data = {
          ...targetBlock!.data,
          ...blockData,
        }
        return { ...state }
      }),
      updateResumeListData: (id, blockData) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((r) => r.id === id)
        if (targetBlock?.type === 'list') {
          targetBlock!.data = {
            ...targetBlock!.data,
            ...blockData,
          }
        }
        return { ...state }
      }),
      updateResumeListItem: (blockId, itemId, item) => set(() => {
        const state = get()

        const block = state.resumeData.find((b) => b.id === blockId) as IResumeList
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!

        if (targetIndex !== -1) {
          if (item === undefined) {
            block.data.items.splice(targetIndex, 1)
          } else {
            block.data.items.splice(targetIndex, 1, {
              ...block.data.items[targetIndex],
              ...item,
            })
          }
        }
        return { ...state }
      }),
      addResumeListItem: (blockId, specific) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((b) => b.id === blockId) as IResumeList
        const id = generateRandomId(10)
        const lists = [
          { value: 'Game Player', icon: 'mdi:nintendo-switch' },
          { value: 'Song Maker', icon: 'mdi:account-music-outline' },
          { value: 'Writer', icon: 'mdi:book-multiple-outline' },
          { value: 'Artist', icon: 'mdi:palette-outline' },
        ]
        if (specific) {
          targetBlock.data.items.push({
            ...specific,
            id,
          })
        } else {
          targetBlock.data.items.push({
            id,
            ...lists[getRandom(0, lists.length - 1)],
          })
        }

        return { ...state }
      }),
      moveResumeListItem: (blockId, itemId, moveto) => set(() => {
        const state = get()

        const { resumeData } = state
        const targetBlock = resumeData.find((r) => r.id === blockId)!
        const targetIndex = targetBlock.data.items.findIndex((i) => i.id === itemId)!
        const newIndex = targetIndex + moveto

        if (newIndex < 0) {
          message.info(i18nInstance.t('noMoreUp'))
          return { ...state }
        } if (newIndex >= targetBlock.data.items.length) {
          message.info(i18nInstance.t('noMoreBottom'))
          return { ...state }
        }
        const el = targetBlock.data.items.splice(targetIndex, 1)[0]
        targetBlock.data.items.splice(newIndex, 0, el as IResumeListItem)

        return { resumeData }
      }),
      deleteResumeListItem: (blockId, itemId) => set(() => {
        const state = get()

        const { resumeData } = state
        const block = resumeData.find((b) => b.id === blockId)!
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!
        block.data.items.splice(targetIndex, 1)
        return { ...state }
      }),
      /** E list methods */

    }),
    {
      name: constant.RESUME_SETTING,
    },
  ),
)
