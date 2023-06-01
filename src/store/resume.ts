import { create } from 'zustand'

import { generateRandomId } from '@/utils'

import type { TextProps } from '@/types'

export interface IResumeSpecifics {
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
  specifics: IResumeSpecifics[]
}

export interface IResumeInfoData {
  title: { value: string }
  name: string
  avatar: string
  info: {
    column: number
    items: TextProps[]
  }
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

interface IResumeState {
  resumeData: IResumeBlock[]
  setResumeData: (resumes: IResumeBlock[]) => void
  setResumeInfoData: (resumeInfo: IResumeInfoData) => void
  setResumeBlockData: (id: string, blockData: IResumeBlockData) => void
  updateResumeBlockData: (id: string, blockData: Partial<IResumeBlockData>) => void
  addResumeBlock: (template: TemplateType) => void
  deleteResumeBlock: (id: string) => void
  addResumeInfoItem: (item: TextProps) => void
  deleteResumeInfoItem: (index: number) => void
}

export const useResumeStore = create<IResumeState>()((set) => ({
  resumeData: [
    {
      type: 'info',
      id: generateRandomId(8),
      template: 0,
      data: {
        title: {
          value: '个人信息',
        },
        name: '名字',
        avatar: 'https://www.nihao.com',
        info: {
          column: 1,
          items: [
            {
              value: 'evanakihito@outlook.com',
              icon: 'eva:email-outline',
            },
            {
              value: '13726270953',
              icon: 'eva:phone-outline',
            },
            {
              value: 'https://github.com/evankwolf',
              icon: 'eva:github-outline',
            },
          ],
        },
      },
    },
    {
      type: 'block',
      id: generateRandomId(8),
      template: 0,
      data: {
        title: {
          value: 'Title',
        },
        specifics: [
          {
            title: {
              value: 'Jingli1',
            },
            subtitle: {
              value: 'SubTitle1',
            },
            note: {
              value: 'Note1',
            },
            description: {
              value: 'description1',
            },
            detail: {
              value: 'detail1',
            },
          },
        ],
      },
    },
    {
      type: 'block',
      id: generateRandomId(8),
      template: 0,
      data: {
        title: {
          value: 'hi',
        },
        specifics: [
          {
            title: {
              value: 'Jingli2',
            },
            subtitle: {
              value: 'SubTitle2',
            },
            note: {
              value: 'Note2',
            },
            description: {
              value: 'description2',
            },
            detail: {
              value: 'detail2',
            },
          },
        ],
      },
    },
  ],
  /** Set whole resume data, including ResumeInfo and ResumeBlock */
  setResumeData: (resumes) => set(() => ({ resumeData: resumes })),
  setResumeInfoData: (resume) => set((state) => {
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
  setResumeBlockData: (id, blockData) => set((state) => {
    const targetBlock = state.resumeData.find((r) => r.id === id)
    targetBlock!.data = {
      ...targetBlock!.data,
      ...blockData,
    }
    return { ...state }
  }),
  updateResumeBlockData: (id, blockData) => set((state) => {
    const targetBlock = state.resumeData.find((r) => r.id === id)
    targetBlock!.data = {
      ...targetBlock!.data,
      ...blockData,
    }
    return { ...state }
  }),
  addResumeBlock: (template: TemplateType) => set((state) => {
    const id = generateRandomId(8)
    const newBlock: IResumeBlockSetting = {
      type: 'block',
      id,
      template,
      data: {
        title: {
          value: `Item-${id}`,
        },
        specifics: [
          {
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
  deleteResumeBlock: (id) => set((state) => {
    console.log(id, state.resumeData)

    const targetIndex = state.resumeData.findIndex((block) => block.id === id)
    if (targetIndex !== -1) {
      console.log(targetIndex)
      state.resumeData.splice(targetIndex, 1)
    }
    return { ...state }
  }),
  addResumeInfoItem: (item: TextProps) => set((state) => {
    const info = state.resumeData.find((resume) => resume.type === 'info')!
    if (info.type === 'info') {
      info.data.info.items.push(item)
    }
    return { ...state }
  }),
  deleteResumeInfoItem: (index: number) => set((state) => {
    const info = state.resumeData.find((resume) => resume.type === 'info')!
    if (info.type === 'info') {
      info.data.info.items.splice(index, 1)
    }
    return { ...state }
  }),
}))
