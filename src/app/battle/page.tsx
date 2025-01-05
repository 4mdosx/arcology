'use client'
import Screen from '@/components/screen_fiter'
import PlayerFleet from './PlayerFleet'

export default function Page() {
  return (
    <Screen>
      <main className="h-full w-full bg-gray-900 flex flex-col">
        <div className="flex-1 bg-gray-800 p-4">{/* <EnemyFleet /> */}1</div>

        <div className="flex-1 bg-gray-700 flex items-end">
          <PlayerFleet />
        </div>
      </main>
    </Screen>
  )
}
