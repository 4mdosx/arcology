'use client'
import { GameProvider } from './contexts/GameContext'
import {
  GameStats,
  ClickArea,
  UpgradeShop,
  GameDescription,
  GameController
} from './components'

function KatzeGameContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">🐱 Katze Idle Game</h1>

        {/* 游戏控制器 - 展示如何在其他组件中使用 useIdleScene */}
        <GameController />

        {/* 游戏状态显示 */}
        <GameStats />

        {/* 主要游戏区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 点击区域 */}
          <ClickArea />

          {/* 升级区域 */}
          <UpgradeShop />
        </div>

        {/* 游戏说明 */}
        <GameDescription />
      </div>
    </div>
  )
}

export default function KatzeGamePage() {
  return (
    <GameProvider>
      <KatzeGameContent />
    </GameProvider>
  )
}
