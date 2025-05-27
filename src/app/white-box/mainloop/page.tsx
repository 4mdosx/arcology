'use client'
import { useEffect, useRef } from 'react'
import { Scene } from '../../../engine/scene'
import { useUIStore } from './uiStore'
import { Entity } from '../../../engine/scene'
import { UIRenderer } from './UIRenderer'

const fpsCountEntity = {
  group: 'ui',
  components: [
    {
      tag: 'fps-count',
      count: 0
    }
  ]
}

const fpsCountSystem = {
  tag: 'fps-count',
  update: (entities: Entity[]) => {
    entities.forEach(entity => {
      entity['fps-count'].count += 1
    })
  }
}

export default function MainLoopDemoPage() {
  const sceneRef = useRef<Scene | null>(null)
  const { loginCount, fps } = useUIStore()

  useEffect(() => {
    sceneRef.current = new Scene()
    sceneRef.current.addSystem(fpsCountSystem)
    sceneRef.current.addEntity(fpsCountEntity)
    const uiRenderer = new UIRenderer()
    sceneRef.current.addRenderer(uiRenderer)
    sceneRef.current.start()

    return () => {
      sceneRef.current?.stop()
    }
  }, [])

  return (
    <div>
      <div className="fixed top-4 left-4 min-w-64 bg-black/50 text-white p-4 rounded">
        <p>FPS: {fps}</p>
        <p>Login Count: {loginCount}</p>
      </div>
    </div>
  )
}
