import { useGameState } from '../contexts/GameContext'

export function GameStats() {
  const { gameState, isInitialized } = useGameState()

  // 如果未初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="bg-black/30 rounded-lg p-6 mb-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="h-8 bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-600 rounded"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-600 rounded"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/30 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-yellow-400">
            {Math.floor(gameState.coins)}
          </div>
          <div className="text-sm text-gray-300">金币</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-400">
            {gameState.coinsPerSecond.toFixed(1)}
          </div>
          <div className="text-sm text-gray-300">每秒金币</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">
            {gameState.clickPower}
          </div>
          <div className="text-sm text-gray-300">点击力量</div>
        </div>
      </div>
    </div>
  )
}
