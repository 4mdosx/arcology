'use client'
import { useGame } from '@/hooks/useGame'
import { useToast } from '@/hooks/useToast'
import { useState, useRef } from 'react'
import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'

export default function Page() {
  const game = useGame()
  const toast = useToast()
  const [logs, setLogs] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  function gather() {
    const result = game.character.gather()
    if (!result.success) {
      toast.show(result.message)
      return
    }
    toast.show(
      `Gathered Raw Material: ${result.raw_material}`
    )
    setLogs([
      ...logs,
      `Gathered Raw Material: ${result.raw_material}`,
    ])
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <main>
      <Header title="Find" />
      <div className="page flex flex-col justify-top p-4 pt-10 pb-40" ref={ref}>
        <p>Find something here.</p>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
      <Button onClick={gather} className="underline fixed bottom-10 w-80 left-1/2 -translate-x-1/2">
        Gather
      </Button>
    </main>
  )
}
