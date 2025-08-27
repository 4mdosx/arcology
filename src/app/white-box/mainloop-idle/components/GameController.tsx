import { useGame } from '../contexts/GameContext'

export const GameController = () => {
  const { scene, cleanupScene, isInitialized } = useGame()

  const handleReset = () => {
    if (confirm('确定要重置游戏吗？这将清除所有进度。')) {
      cleanupScene()
      // 重新初始化场景
      window.location.reload()
    }
  }

  const handlePause = () => {
    if (scene && isInitialized) {
      scene.stop()
    }
  }

  const handleResume = () => {
    if (scene && isInitialized) {
      scene.start()
    }
  }

  // 如果未初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-600 rounded mb-3"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 bg-gray-600 rounded w-20"></div>
            <div className="h-10 bg-gray-600 rounded w-20"></div>
            <div className="h-10 bg-gray-600 rounded w-20"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">游戏控制</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition-colors"
        >
          暂停
        </button>
        <button
          onClick={handleResume}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
        >
          继续
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          重置游戏
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-300">
        <p>场景状态: {scene ? '运行中' : '未初始化'}</p>
      </div>
    </div>
  )
}
