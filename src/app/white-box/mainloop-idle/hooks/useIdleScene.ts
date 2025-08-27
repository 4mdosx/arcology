import { Scene } from '../../../../engine/scene'
import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react'
import { autoIncomeSystem, autoUpgradeSystem, clickUpgradeSystem, createGameEntities, GameState } from '../gameLogic'

// 全局状态管理
let globalScene: Scene | null = null
let globalGameState: GameState = {
  coins: 0,
  coinsPerSecond: 0,
  clickPower: 1,
  upgrades: {
    clickUpgrade: 0,
    autoUpgrade: 0
  }
}

export const useIdleScene = () => {
  const [gameState, setGameState] = useState<GameState>(globalGameState)
  const [isInitialized, setIsInitialized] = useState(false)

  // 更新全局状态的函数，使其与 React 的 Dispatch 类型兼容
  const updateGlobalGameState: Dispatch<SetStateAction<GameState>> = useCallback((newState: GameState | ((prev: GameState) => GameState)) => {
    if (typeof newState === 'function') {
      const updatedState = newState(globalGameState)
      globalGameState = updatedState
      setGameState(updatedState)
    } else {
      globalGameState = newState
      setGameState(newState)
    }
  }, [])

  // 初始化场景的函数
  const initializeScene = useCallback(() => {
    if (globalScene) {
      // 如果场景已存在，直接返回
      setIsInitialized(true)
      return
    }

    // 创建新的游戏场景
    globalScene = new Scene({
      domId: 'katze-game',
      width: 800,
      height: 600,
      dev: false,
      inactiveTime: 30000,
      maxFPS: 60,
      maxTick: 30
    })

    // 添加游戏系统
    globalScene.addSystem(clickUpgradeSystem)
    globalScene.addSystem(autoUpgradeSystem)
    globalScene.addSystem(autoIncomeSystem)

    // 创建游戏实体
    const entities = createGameEntities(globalGameState)
    globalScene.addEntity(entities.clickUpgradeEntity)
    globalScene.addEntity(entities.autoUpgradeEntity)
    globalScene.addEntity(entities.autoIncomeEntity)

    // 启动游戏循环
    globalScene.start()
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    initializeScene()

    return () => {
      // 注意：这里不清理全局场景，因为其他组件可能还在使用
      // 只有在所有组件都卸载时才清理
    }
  }, [initializeScene])

  // 清理全局场景的函数（在需要时调用）
  const cleanupScene = useCallback(() => {
    if (globalScene) {
      globalScene.stop()
      globalScene = null
      globalGameState = {
        coins: 0,
        coinsPerSecond: 0,
        clickPower: 1,
        upgrades: {
          clickUpgrade: 0,
          autoUpgrade: 0
        }
      }
      setIsInitialized(false)
    }
  }, [])

  // 返回一个安全的游戏状态，即使未初始化也能正常工作
  const safeGameState = isInitialized ? gameState : globalGameState

  return {
    scene: globalScene,
    state: safeGameState,
    setGameState: updateGlobalGameState,
    isInitialized,
    cleanupScene
  }
}
