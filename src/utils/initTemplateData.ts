import constant from '@/config/constant'

import type { IResumeBlock, IResumeStyle } from '@/store'

import TemplateData from '../config/template.json'

export interface IResumeStorage {
  state: {
    resumeData: IResumeBlock[]
    resumeStyle: IResumeStyle
  }
}

const initTemplateData = (): IResumeStorage => {
  try {
    const data = localStorage.getItem(constant.RESUME_SETTING)
    if (!data) {
      return TemplateData as IResumeStorage
    }

    const obj = JSON.parse(data) as IResumeStorage
    if (!obj.state || !obj.state.resumeData || !obj.state.resumeStyle) {
      localStorage.removeItem(constant.RESUME_SETTING)
      return TemplateData as IResumeStorage
    }

    return JSON.parse(data)
  } catch (e) {
    return TemplateData as IResumeStorage
  }
}

export default initTemplateData
