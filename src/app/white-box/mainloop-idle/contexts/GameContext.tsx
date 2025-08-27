import React, { createContext, useContext, ReactNode } from 'react'
import { useIdleScene } from '../hooks/useIdleScene'
import { GameState } from '../gameLogic'
import { Scene } from '../../../../engine/scene'

interface GameContextType {
  gameState: GameState
  setGameState: (newState: GameState | ((prev: GameState) => GameState)) => void
  scene: Scene | null
  isInitialized: boolean
  cleanupScene: () => void
}

const GameContext = createContext<GameContextType | null>(null)

// 默认游戏状态
const DEFAULT_GAME_STATE: GameState = {
  coins: 0,
  coinsPerSecond: 0,
  clickPower: 1,
  upgrades: {
    clickUpgrade: 0,
    autoUpgrade: 0
  }
}

// 游戏状态提供者
export function GameProvider({ children }: { children: ReactNode }) {
  const gameData = useIdleScene()

  // 将 useIdleScene 返回的数据映射到 GameContextType 接口
  const contextValue: GameContextType = {
    gameState: gameData.state,
    setGameState: gameData.setGameState,
    scene: gameData.scene,
    isInitialized: gameData.isInitialized,
    cleanupScene: gameData.cleanupScene
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}

// 自定义钩子：使用游戏状态
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

// 简化的游戏状态钩子，自动处理初始化
export function useGameState() {
  const { gameState, setGameState, isInitialized } = useGame()

  // 如果未初始化，返回安全的默认状态
  if (!isInitialized) {
    return {
      gameState: DEFAULT_GAME_STATE,
      setGameState: () => {
        // 在开发模式下提供警告
        if (process.env.NODE_ENV === 'development') {
          console.warn('Attempted to update game state before initialization')
        }
      },
      isInitialized: false
    }
  }

  return { gameState, setGameState, isInitialized }
}
