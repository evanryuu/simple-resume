import { generateRandomId } from './utils'

import type {
  IResumeExperience, BlockType, IResumeList, IResumeInfo,
} from '@/store'

type GenBlockFromType<T extends BlockType> = T extends 'exp'
  ? IResumeExperience
  : T extends 'list'
    ? IResumeList
    : T extends 'info'
      ? IResumeInfo
      : never

export const genBlock = <T extends BlockType>(blockType: T): GenBlockFromType<T> => {
  const blockId = generateRandomId(8)
  const itemId = generateRandomId(10)
  if (blockType === 'exp') {
    return {
      type: blockType,
      id: blockId,
      template: 0,
      data: {
        blockTitle: {
          value: `Item-${blockId}`,
        },
        items: [
          {
            id: itemId,
            title: {
              value: `Experience-${itemId}`,
            },
            subtitle: {
              value: `SubTitle-${itemId}`,
            },
            note: {
              value: `Note-${itemId}`,
            },
            description: {
              value: `description-${itemId}`,
            },
            detail: {
              value: `detail-${itemId}`,
            },
          },
        ],
      },
    } as IResumeExperience as GenBlockFromType<T>
  }
  if (blockType === 'list') {
    return {
      type: blockType,
      id: blockId,
      template: 0,
      data: {
        column: 3,
        blockTitle: {
          value: `List-${blockId}`,
        },
        items: [
          { id: generateRandomId(10), value: 'Game Player', icon: 'mdi:nintendo-switch' },
          { id: generateRandomId(10), value: 'Song Maker', icon: 'mdi:account-music-outline' },
          { id: generateRandomId(10), value: 'Writer', icon: 'mdi:book-multiple-outline' },
          { id: generateRandomId(10), value: 'Artist', icon: 'mdi:palette-outline' },
        ],
      },
    } as IResumeList as GenBlockFromType<T>
  }
  return {
    type: blockType,
    id: blockId,
    template: 0,
    data: {
      blockTitle: {
        value: 'Personal Info',
      },
      name: 'EvanLiu',
      avatar: 'https://avatars.githubusercontent.com/u/55378595?v=4',
      column: 1,
      items: [
        {
          id: '756865294',
          value: 'evanakihito@outlook.com',
          icon: 'eva:email-outline',
          iconColor: '#ff1647',
        },
        {
          id: '410277393',
          value: '137****0953',
          icon: 'eva:phone-outline',
        },
        {
          id: '945473855',
          value: 'github.com/evanryuu',
          icon: 'eva:github-outline',
        },
        {
          value: 'juejin.cn/user/427030498524711',
          icon: 'tabler:brand-juejin',
          id: '321482400',
        },
      ],
    },
  } as IResumeInfo as GenBlockFromType<T>
}
