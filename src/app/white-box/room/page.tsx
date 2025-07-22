'use client'
import { useEffect, useRef } from 'react'
import { GameScene } from '../../../engine/gameScene'


export default function MainLoopDemoPage() {
  const sceneRef = useRef<GameScene | null>(null)

  useEffect(() => {
    sceneRef.current = new GameScene({
      domId: 'main',
      width: 600,
      height: 600,
      inactiveTime: 5 * 1000,
      dev: true,
      maxFPS: 30,
      maxTick: 30
    })
    sceneRef.current.start()

    return () => {
      sceneRef.current?.stop()
    }
  }, [])

  return (
    <div>
      <div className="fixed top-4 left-4 min-w-64 bg-black/50 text-white p-4 rounded">
        <div id="main"></div>
      </div>
    </div>
  )
}
