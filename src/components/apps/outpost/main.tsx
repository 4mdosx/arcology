'use client'
import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'
import './outpost.css'
import { useState, useEffect } from 'react'

interface AppProps {
  style?: React.CSSProperties
}

export default function Outpost({ style }: AppProps) {
  const [power, setPower] = useState(10)
  const maxPower = 100
  const length = Math.floor(power / maxPower * 19)

  return (
    <Link href="/outpost" style={style}>
      <AppWrapper className='outpost_app'>
        <div className='icon'>
          <MaterialSymbols raw="&#xe7f1;" ></MaterialSymbols>
        </div>
        <div className='power_indicator flex flex-wrap px-1 ml-1'>
          {
            Array.from({ length }, (_, i) => (
              <span key={i} className='power-bar h-2 bg-yellow-300' style={{ width: '3px', margin: '1px 1px' }}></span>
            ))
          }
        </div>
      </AppWrapper>
    </Link>
  )
}
