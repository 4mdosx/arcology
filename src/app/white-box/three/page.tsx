'use client'
import { useRef, useEffect } from 'react'
import { initThreeJsScene } from './threeCanvas'

export default function ThreePage() {
  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (node.current) {
      initThreeJsScene(node.current)
    }
  }, [])
  return <div ref={node} />
}
