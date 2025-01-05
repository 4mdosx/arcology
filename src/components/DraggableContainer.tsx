'use client'
import React, { useState } from 'react'

interface DraggableContainerInterface {
  children: React.ReactElement
  width: number
  height: number
}

export default function DraggableContainer({
  children,
  width,
  height,
}: DraggableContainerInterface) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [bound, setBound] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    setDragStart({ x: clientX - position.x, y: clientY - position.y })
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging) {
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      })
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  return (
    <div
      className="w-full h-full overflow-hidden cursor-move"
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s ease-in-out',
          width: '100vw',
          height: '100vh',
        }}
      >
        {React.cloneElement(children, { setPosition, setBound })}
      </div>
    </div>
  )
}
