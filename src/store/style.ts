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
  subtitleBackgroundColor: Color,
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
    themeColor: '#01579b',
    avatarWidth: 120,
    avatarRounded: true,
    infoItemsColumn: 2,
    titleStyle: 'banner',
    lineBelowInfo: '#E8E8E8',
    blockPadding: 32,
    blockHeaderSize: 14,
    titleSize: 18,
    subtitleSize: 12,
    subtitleColor: '#bbb',
    subtitleBackgroundColor: '#fff',
    noteSize: 14,
    noteColor: '#bbb',
    noteBackgroundColor: '#fff',
  },
  setResumeStyle: (style) => set(() => ({ resumeStyle: style })),
}))
