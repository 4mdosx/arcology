'use client'
import { useGame } from '@/hooks/useGame'
import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'
import './outpost.css'
import { useState, useEffect } from 'react'

interface AppProps {
  style?: React.CSSProperties
}

export default function Outpost({ style }: AppProps) {
  const game = useGame()
  const [power, setPower] = useState(game.data.outpost.power)
  const maxPower = game.data.outpost.max.power
  const length = Math.floor(power / maxPower * 19)
  useEffect(() => {
    const timer = setInterval(() => {
      const power = game.data.outpost.power
      setPower(power)
    }, 1000)

    return () => {
        clearInterval(timer)
    }
  }, [game])

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
