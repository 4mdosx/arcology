import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <main className="main">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">Arcology</div>
        <a href="/dashboard">
          <button>Play</button>
        </a>
      </div>
    </main>
  )
}
