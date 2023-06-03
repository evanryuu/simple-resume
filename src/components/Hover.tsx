import React, { useState } from 'react'

import { useResumeStore } from '@/store'

export interface HoverProps {
  children: React.ReactNode
  changedType?: 'color' | 'backgroundColor'
}

const HoverChangeColor: React.FC<HoverProps> = (props) => {
  const { children, changedType } = props

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
      style={divStyle}
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
