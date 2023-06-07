import React, { useState, useRef } from 'react'

import type { BaseComponentProps } from '@/types'

interface Position {
  x: number;
  y: number;
}

export interface DraggableResizableBackgroundProps extends BaseComponentProps {
  gridBackground?: boolean
}

const DraggableResizableBackground: React.FC<DraggableResizableBackgroundProps> = (props) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [scale, setScale] = useState<number>(1)
  const [dragging, setDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartPosition({ x: event.clientX, y: event.clientY })
    setDragging(true)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const offsetX = event.clientX - startPosition.x
      const offsetY = event.clientY - startPosition.y
      setPosition({ x: position.x + offsetX, y: position.y + offsetY })
      setStartPosition({ x: event.clientX, y: event.clientY })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    setStartPosition({ x: touch.clientX, y: touch.clientY })
    setDragging(true)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (dragging) {
      const touch = event.touches[0]
      const offsetX = touch.clientX - startPosition.x
      const offsetY = touch.clientY - startPosition.y
      setPosition({ x: position.x + offsetX, y: position.y + offsetY })
      setStartPosition({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY > 0 ? -0.1 : 0.1
    const newScale = scale + delta
    if (newScale >= 0.1 && newScale <= 3) {
      setScale(newScale)
    }
  }

  const gridBackgroundImage = props.gridBackground ? {
    backgroundImage: 'linear-gradient(to right, transparent 1px, #000 1px), linear-gradient(transparent 1px, #000 1px)',
    backgroundSize: '20px 20px',
  } : {}

  return (
    <div
      role="presentation"
      ref={containerRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: dragging ? 'grabbing' : 'grab',
        ...gridBackgroundImage,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        style={{
          position: 'relative',
          top: position.y,
          left: position.x,
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

export default DraggableResizableBackground
