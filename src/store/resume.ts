import { message } from 'antd'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import constant from '@/config/constant'
import TemplateData from '@/config/template.json'
import { generateRandomId, initTemplateData } from '@/utils'

import type { Color, TextProps } from '@/types'

export interface IResumeBlockItem {
  id: string
  title: TextProps
  subtitle?: TextProps
  note?: TextProps
  description?: TextProps
  detail?: TextProps
}

export interface IResumeBlockData {
  title: TextProps & {
    value: string
  }
  items: IResumeBlockItem[]
}

export type IResumeInfoItem = (TextProps & { id: string })

export interface IResumeInfoData {
  title: { value: string }
  name: string
  avatar: string
  column: number
  items: IResumeInfoItem[]
}

export type TemplateType = 0

export interface IResumeBlockSetting {
  type: 'block'
  id: string
  template: TemplateType
  data: IResumeBlockData
}

export interface IResumeInfoSetting {
  type: 'info'
  id: string
  template: TemplateType
  data: IResumeInfoData
}

export type IResumeBlock = IResumeBlockSetting | IResumeInfoSetting

export type IResumeData = IResumeBlock[]

export interface IResumeStyle {
  themeColor: Color
  avatarWidth: number
  avatarRounded: boolean
  infoItemsColumn: number
  lineBelowInfo: Color
  blockPadding: number
  titleSize: number
  titleStyle: 'banner' | 'text' | 'tag'
  subtitleSize: number
  subtitleColor: Color
  subtitleBackgroundColor: Color,
  blockHeaderSize: number

  noteSize: number
  noteColor: Color
  noteBackgroundColor: Color
}

interface IResumeState {
  resetResumeSettings: () => void

  resumeStyle: IResumeStyle
  setResumeStyle: (style: IResumeStyle) => void

  resumeData: IResumeData
  setResumeData: (resumes: IResumeBlock[]) => void
  moveResumeBlock: (id: string, moveto: number) => void

  setResumeInfoData: (resumeInfo: IResumeInfoData) => void
  setResumeBlockData: (id: string, blockData: IResumeBlockData) => void
  updateResumeBlockData: (id: string, blockData: Partial<IResumeBlockData>) => void
  addResumeBlockItem: (blockId: string, item?: IResumeBlockItem) => void
  deleteResumeBlockItem: (blockId: string, itemId: string) => void
  updateResumeBlockItem: (blockId: string, itemId: string, item?: Partial<IResumeBlockItem>) => void

  addResumeBlock: (template: TemplateType) => void
  deleteResumeBlock: (id: string) => void
  updateResumeInfoItem: (itemId: string, item?: Partial<IResumeInfoItem>) => void
  addResumeInfoItem: (item: TextProps) => void
  deleteResumeInfoItem: (index: number) => void
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
          message.info('Oops, 不能再往前了朋友')
          return { ...state }
        } if (newIndex >= resumeData.length) {
          message.info('真的下不去了')
          return { ...state }
        }
        const el = resumeData.splice(targetIndex, 1)[0]
        resumeData.splice(newIndex, 0, el)

        return { resumeData }
      }),
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
      setResumeBlockData: (id, blockData) => set(() => {
        const state = get()
        const targetBlock = state.resumeData.find((r) => r.id === id)
        targetBlock!.data = {
          ...targetBlock!.data,
          ...blockData,
        }
        return { ...state }
      }),
      updateResumeBlockData: (id, blockData) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((r) => r.id === id)
        if (targetBlock?.type === 'block') {
          targetBlock!.data = {
            ...targetBlock!.data,
            ...blockData,
          }
        }
        return { ...state }
      }),
      updateResumeBlockItem: (blockId, itemId, item) => set(() => {
        const state = get()

        const block = state.resumeData.find((b) => b.id === blockId) as IResumeBlockSetting
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!

        if (targetIndex !== -1) {
          console.log('updata', targetIndex, block.data.items[targetIndex], item)

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
      addResumeBlockItem: (blockId, specific) => set(() => {
        const state = get()

        const targetBlock = state.resumeData.find((b) => b.id === blockId) as IResumeBlockSetting
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
              value: `Jingli-${id}`,
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
      addResumeBlock: (template: TemplateType) => set(() => {
        const state = get()

        const id = generateRandomId(8)
        const newBlock: IResumeBlockSetting = {
          type: 'block',
          id,
          template,
          data: {
            title: {
              value: `Item-${id}`,
            },
            items: [
              {
                id: generateRandomId(10),
                title: {
                  value: `Jingli-${id}`,
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
              },
            ],
          },
        }

        return {
          ...state,
          resumeData: [
            ...state.resumeData,
            newBlock,
          ],
        }
      }),
      updateResumeInfoItem: (itemId, item) => set(() => {
        const state = get()

        const { resumeData } = state
        const info = resumeData.find((r) => r.type === 'info') as IResumeInfoSetting

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
      deleteResumeBlockItem: (blockId, itemId) => set(() => {
        const state = get()

        const { resumeData } = state
        const block = resumeData.find((b) => b.id === blockId)!
        const targetIndex = block.data.items.findIndex((i) => i.id === itemId)!
        block.data.items.splice(targetIndex, 1)
        return { ...state }
      }),
      deleteResumeBlock: (id) => set(() => {
        const state = get()

        console.log(id, state.resumeData)

        const targetIndex = state.resumeData.findIndex((block) => block.id === id)
        if (targetIndex !== -1) {
          console.log(targetIndex)
          state.resumeData.splice(targetIndex, 1)
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
      deleteResumeInfoItem: (index: number) => set(() => {
        const state = get()

        const info = state.resumeData.find((resume) => resume.type === 'info')!
        if (info.type === 'info') {
          info.data.items.splice(index, 1)
        }
        return { ...state }
      }),
    }),
    {
      name: constant.RESUME_SETTING,
    },
  ),
)
