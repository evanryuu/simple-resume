import React, { useState } from 'react'

import { useResumeStore } from '@/store'

import type { BaseComponentProps } from '@/types'

export interface HoverProps extends BaseComponentProps {
  children: React.ReactNode
  changedType?: 'color' | 'backgroundColor'
}

const HoverChangeColor: React.FC<HoverProps> = (props) => {
  const {
    children, changedType, style, className,
  } = props

  const [isHovered, setIsHovered] = useState(false)

  const { resumeStyle } = useResumeStore()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const divStyle = {
    [changedType!]: isHovered ? resumeStyle.themeColor.value : '',
  }

  return (
    <div
      className={className}
      style={{
        ...divStyle,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

HoverChangeColor.defaultProps = {
  changedType: 'color',
}

export default HoverChangeColor
