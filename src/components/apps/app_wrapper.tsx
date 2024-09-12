'use client'
import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import './app_wrapper.css'

interface AppWrapperProps {
  className?: string
  children: React.ReactNode | React.ReactNode[]
}


export default function AppWrapper(props: Readonly<AppWrapperProps>) {
  const cls: string[] = []


  return (
    <div className={clsx(props.className, cls, 'app_wrapper')}>
      { props.children }
    </div>
  )
}
