'use client'
import { useGame } from '@/hooks/useGame'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const game = useGame()
  const toast = useToast()
  const [logs, setLogs] = useState<string[]>([])

  function gather() {
    const result = game.character.gather()
    if (!result.success) {
      toast.show(result.message)
      return
    }
    toast.show(
      `Gathered Fuel: ${result.fuel} Raw Material: ${result.raw_material}`
    )
    setLogs([
      ...logs,
      `Gathered Fuel: ${result.fuel} Raw Material: ${result.raw_material}`,
    ])
  }

  return (
    <main className="page p-4">
      <h1>Find</h1>
      <p>Find something here.</p>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
      <button onClick={gather} className="underline mr-2">
        Gather
      </button>
      {logs.length > 0 && (
        <Link href="/outpost">
          <button className="underline">Check Inventory</button>
        </Link>
      )}
    </main>
  )
}
