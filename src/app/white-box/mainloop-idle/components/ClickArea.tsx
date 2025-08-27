import { useGameState } from '../contexts/GameContext'
import { gameActions } from '../gameLogic'

export function ClickArea() {
  const { gameState, setGameState, isInitialized } = useGameState()

  const handleClick = () => {
    if (isInitialized) {
      gameActions.handleClick(gameState, setGameState)
    }
  }

  // 如果未初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="bg-black/30 rounded-lg p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded mb-4"></div>
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-600 rounded mt-4 w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/30 rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold mb-4">点击赚金币</h2>
      <button
        onClick={handleClick}
        className="w-32 h-32 bg-yellow-500 hover:bg-yellow-600 rounded-full text-2xl font-bold transition-all transform hover:scale-105 active:scale-95"
      >
        💰
      </button>
      <p className="mt-4 text-sm text-gray-300">
        每次点击获得 {gameState.clickPower} 金币
      </p>
    </div>
  )
}
