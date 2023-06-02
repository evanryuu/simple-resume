import { create } from 'zustand'

import type { Color } from '@/types'

export interface IResumeStyle {
  themeColor: Color
  avatarWidth: number
  avatarRounded: boolean
  infoItemsColumn: number
  lineBelowInfo: Color
  blockPadding: number
  titleSize: number
  titleStyle: 'banner' | 'text'
  subtitleSize: number
  subtitleColor: Color
  blockHeaderSize: number

  noteSize: number
  noteColor: Color
  noteBackgroundColor: Color
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
    infoItemsColumn: 2,
    titleStyle: 'banner',
    lineBelowInfo: '#333',
    blockPadding: 20,
    blockHeaderSize: 20,
    titleSize: 20,
    subtitleSize: 12,
    subtitleColor: '#ddd',
    noteSize: 14,
    noteColor: '#ddd',
    noteBackgroundColor: '#fff',
  },
  setResumeStyle: (style) => set(() => ({ resumeStyle: style })),
}))
