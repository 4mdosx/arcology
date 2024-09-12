'use client'
import './app.css'
import Modal from '@/components/modal'
import Toast from '@/components/toast'
import { useGame } from '@/hooks/useGame'
import { useEffect } from 'react'

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const game = useGame()
  useEffect(() => {
    game.init()
    return () => {
      game.stop()
    }
  })

  return (
    <div id="app">
      {children}
      <Modal />
      <Toast />
    </div>
  )
}
