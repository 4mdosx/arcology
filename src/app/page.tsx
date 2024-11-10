'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const play = () => {
    router.push('/dashboard')
  }
  return (
    <main className="main">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">Arcology</div>
        <button onClick={play}>Play</button>
      </div>
    </main>
  )
}
