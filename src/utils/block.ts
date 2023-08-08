import { generateRandomId } from './utils'

import type { IResumeBlockSetting, TemplateType } from '@/store'

export const genBlock = (template: TemplateType) => {
  const blockId = generateRandomId(8)
  let newBlock = {} as IResumeBlockSetting
  if (template === 0) {
    newBlock = {
      type: 'block',
      id: blockId,
      template,
      data: {
        blockTitle: {
          value: `Item-${blockId}`,
        },
        items: [
          {
            id: generateRandomId(10),
            title: {
              value: `Experience-${blockId}`,
            },
            subtitle: {
              value: `SubTitle-${blockId}`,
            },
            note: {
              value: `Note-${blockId}`,
            },
            description: {
              value: `description-${blockId}`,
            },
            detail: {
              value: `detail-${blockId}`,
            },
          },
        ],
      },
    }
  }
  return newBlock
}
