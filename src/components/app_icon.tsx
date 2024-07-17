'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
const Icons = {
  article: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#5f6368"
    >
      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>
  ),
} as any
export default function AppIcon({ name }: Readonly<{ name: string }>) {
  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.add('dragging')
  }
  function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove('dragging')
  }
  return (
    <div className="widget-icon" draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {Icons[name]}
    </div>
  )
}
