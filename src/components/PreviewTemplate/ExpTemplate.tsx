import React, { useContext, useRef } from 'react'

import classNames from 'classnames'

import { AppContext } from '@/App'
import { useAppStore, useResumeStore } from '@/store'

import type { SelectedEditItemData } from '@/App'
import type { IResumeExperienceItem, IResumeExperience } from '@/store/resume'

import Text from '../Text/Text'

export type BlockTemplateProps = IResumeExperience

const BlockTemplate0: React.FC<BlockTemplateProps> = (props) => {
  const { id: blockId } = props
  const { blockTitle, items } = props.data
  const singleClick = useRef<any>(null)
  const { resumeStyle } = useResumeStore()
  const { setShowEdit, showEditDelay } = useAppStore()
  const { selectedEditItem, setSelectedEditItem } = useContext(AppContext)

  const titleIsNotText = resumeStyle.titleStyle.value !== 'text'

  const titleClasses = classNames('editable block-title font-semibold text-left py-1 tracking-widest', {
    [`is-${resumeStyle.titleStyle.value}`]: titleIsNotText,
  })

  const genParam = (type: Omit<keyof IResumeExperienceItem, 'id'>, itemId?: string): SelectedEditItemData => {
    const idArr = [blockId]
    if (itemId) idArr.push(itemId)
    if (type === 'blockTitle') {
      idArr.length = 0
    }
    console.log(idArr)
    return {
      blockType: 'exp',
      type,
      itemId,
      blockId,
      ids: idArr,
    }
  }

  const handleItemClick = (value: React.SetStateAction<SelectedEditItemData>) => {
    singleClick.current = true
    setTimeout(() => {
      if (singleClick.current) {
        setShowEdit(true)
        setSelectedEditItem(value)
      }
    }, showEditDelay)
  }

  const handleItemDbClick = () => {
    singleClick.current = false
  }

  return (
    <div className="mt-4">
      <div
        role="presentation"
        className={titleClasses}
        style={{
          color: titleIsNotText ? '#fff' : resumeStyle.themeColor.value,
          background: titleIsNotText ? resumeStyle.themeColor.value : '#fff',
          paddingLeft: titleIsNotText ? 8 : 0,
          fontSize: resumeStyle.blockHeaderSize.value,
        }}
        onClick={() => handleItemClick(genParam('blockTitle'))}
      >
        {blockTitle.value}
      </div>
      {
        items.map((item, i) => (
          <div className="specific-container" key={i}>
            <div className="flex items-center justify-between">
              <div className="specific-title flex items-center mb-1">
                {
                  item.title && item.title.value
                  && (
                    <div
                      role="presentation"
                      className={classNames('editable', {
                        editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'title',
                      })}
                      onClick={() => handleItemClick(genParam('title', item.id))}
                    >
                      <Text
                        onDbClick={handleItemDbClick}
                        style={{
                          fontSize: resumeStyle.titleSize.value,
                        }}
                        classes="text-md font-bold"
                        {...item.title}
                        block={props}
                        item={item}
                        itemType="title"
                      />
                    </div>
                  )

                }
                {
                  item.subtitle && item.subtitle.value
                  && (
                    <div
                      role="presentation"
                      className={classNames('editable flex items-center', {
                        editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'subtitle',
                      })}
                      onClick={() => handleItemClick(genParam('subtitle', item.id))}
                    >
                      <Text
                        onDbClick={handleItemDbClick}
                        classes="ml-2 text-xs inline-block"
                        style={{
                          fontSize: resumeStyle.subtitleSize.value,
                          color: resumeStyle.subtitleColor.value,
                          padding: '0px 4px',
                          borderRadius: 2,
                          backgroundColor: resumeStyle.subtitleBackgroundColor.value,
                        }}
                        {...item.subtitle}
                        block={props}
                        item={item}
                        itemType="subtitle"
                      />
                    </div>
                  )

                }
              </div>
              {
                item.note && item.note.value
                && (
                  <div
                    role="presentation"
                    className={classNames('editable', {
                      editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'note',
                    })}
                    onClick={() => handleItemClick(genParam('note', item.id))}
                  >
                    <Text
                      onDbClick={handleItemDbClick}
                      style={{
                        fontSize: resumeStyle.noteSize.value,
                        color: resumeStyle.noteColor.value,
                        padding: '0px 4px',
                        borderRadius: 2,
                        backgroundColor: resumeStyle.noteBackgroundColor.value,
                      }}
                      classes="specific-title-note text-sm inline-block"
                      {...item.note}
                      block={props}
                      item={item}
                      itemType="note"
                    />
                  </div>
                )

              }
            </div>
            {
              item.description && item.description.value
              && (
                <div
                  role="presentation"
                  className={classNames('editable specific-description mb-2', {
                    'whitespace-pre-wrap': !item.description.md,
                    editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'description',
                  })}
                  onClick={() => handleItemClick(genParam('description', item.id))}
                >
                  <Text
                    onDbClick={handleItemDbClick}
                    classes="text-sm"
                    {...item.description}
                    block={props}
                    item={item}
                    itemType="description"
                  />
                </div>
              )
            }
            {item.detail && item.detail.value
              && (
                <div
                  role="presentation"
                  className={classNames('editable text-md specific-detail', {
                    'whitespace-pre-wrap': !item.detail.md,
                    editting: item.id === selectedEditItem.itemId && selectedEditItem.type === 'detail',
                  })}
                  onClick={() => handleItemClick(genParam('detail', item.id))}
                >
                  <Text
                    onDbClick={handleItemDbClick}
                    classes="text-sm"
                    {...item.detail}
                    block={props}
                    item={item}
                    itemType="detail"
                  />
                </div>
              )}
          </div>
        ))
      }
    </div>
  )
}

export default BlockTemplate0
