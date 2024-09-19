'use client'
import { useModal } from '@/hooks/useModal'
import { useState, useEffect } from 'react'
import { useCamp } from '@/hooks/useCamp'
import { useBattle } from '@/hooks/useBattle'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import Stock from './apps/stock/main'
import MaterialSymbols from './material_symbols'

function Next() {
  const { gather } = useCamp()
  const { initBattle } = useBattle()
  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const className = clsx('next', disabled ? 'disabled' : '')
  const onClick = () => {
    if (disabled) return
    setDisabled(true)
    if (Math.random() > 0) {
      initBattle()
      router.push('/battle')
    } else {
      gather()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDisabled(false)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={className} onClick={onClick}>
      <MaterialSymbols raw="&#xe574;"></MaterialSymbols>
      <span className="text ml-1">收集</span>
    </div>
  )
}

export default function Desktop() {
  return (
    <div className="desktop">
      <div style={{ left: '10px', top: '10px', position: 'relative' }}>
        <Stock />
      </div>
      <Next />
    </div>
  )
}
