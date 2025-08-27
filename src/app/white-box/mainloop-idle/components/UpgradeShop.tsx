import { useGameState } from '../contexts/GameContext'
import { gameActions } from '../gameLogic'

export function UpgradeShop() {
  const { gameState, setGameState, isInitialized } = useGameState()

  const handleBuyClickUpgrade = () => {
    if (isInitialized) {
      gameActions.buyClickUpgrade(gameState, setGameState)
    }
  }

  const handleBuyAutoUpgrade = () => {
    if (isInitialized) {
      gameActions.buyAutoUpgrade(gameState, setGameState)
    }
  }

  // 如果未初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="bg-black/30 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded mb-2"></div>
              <div className="h-8 bg-gray-600 rounded"></div>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded mb-2"></div>
              <div className="h-8 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/30 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">升级商店</h2>

      {/* 点击升级 */}
      <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span>点击力量升级</span>
          <span className="text-sm text-gray-400">
            Lv.{gameState.upgrades.clickUpgrade}
          </span>
        </div>
        <div className="text-sm text-gray-300 mb-2">
          提升每次点击的金币数量
        </div>
        <button
          onClick={handleBuyClickUpgrade}
          disabled={gameState.coins < 10}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded px-4 py-2 transition-colors"
        >
          购买 (10 金币)
        </button>
      </div>

      {/* 自动升级 */}
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span>自动收益升级</span>
          <span className="text-sm text-gray-400">
            Lv.{gameState.upgrades.autoUpgrade}
          </span>
        </div>
        <div className="text-sm text-gray-300 mb-2">
          提升每秒自动获得的金币
        </div>
        <button
          onClick={handleBuyAutoUpgrade}
          disabled={gameState.coins < 50}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded px-4 py-2 transition-colors"
        >
          购买 (50 金币)
        </button>
      </div>
    </div>
  )
}
