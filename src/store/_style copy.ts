import { create } from 'zustand'

import { initTemplateData } from '@/utils'

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
  resumeStyle: initTemplateData().state.resumeStyle,
  setResumeStyle: (style) => set(() => ({ resumeStyle: style })),
}))
