import { create } from 'zustand'

import type { Color } from '@/types'

interface IResumeStyle {
  themeColor: Color
  titleStyle: 'banner' | 'text'
  avatarWidth: number
  avatarRounded: boolean
  lineBelowInfo: Color
  blockPadding: number
  titleSize: number
  subtitleSize: number
  subtitleColor: Color
}

export interface IResumeStyleState {
  resumeStyle: IResumeStyle
  setResumeStyle: (style: IResumeStyle) => void
}

export const useResumeStyleStore = create<IResumeStyleState>()((set) => ({
  resumeStyle: {
    themeColor: '#d94a38',
    avatarWidth: 120,
    avatarRounded: true,
    titleStyle: 'banner',
    lineBelowInfo: '#333',
    blockPadding: 20,
    titleSize: 20,
    subtitleSize: 12,
    subtitleColor: '#ddd',
  },
  setResumeStyle: (style) => set(() => ({ resumeStyle: style })),
}))
