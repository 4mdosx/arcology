import { Entity } from '../../../engine/scene'

// 游戏状态接口
export interface GameState {
  coins: number
  coinsPerSecond: number
  clickPower: number
  upgrades: {
    clickUpgrade: number
    autoUpgrade: number
  }
}

// 组件类型定义
export interface ClickUpgradeComponent {
  level: number
  cost: number
  canAfford: boolean
  gameState: GameState
}

export interface AutoUpgradeComponent {
  level: number
  cost: number
  canAfford: boolean
  gameState: GameState
}

export interface AutoIncomeComponent {
  gameState: GameState
}

// 点击升级系统
export const clickUpgradeSystem = {
  tag: 'click-upgrade',
  update: (entities: Entity[]) => {
    entities.forEach(entity => {
      const component = entity['click-upgrade'] as ClickUpgradeComponent
      if (component) {
        if (component.canAfford && component.cost <= component.gameState.coins) {
          component.gameState.coins -= component.cost
          component.gameState.clickPower += 1
          component.cost = Math.floor(component.cost * 1.15)
          component.level += 1
        }
      }
    })
  }
}

// 自动升级系统
export const autoUpgradeSystem = {
  tag: 'auto-upgrade',
  update: (entities: Entity[]) => {
    entities.forEach(entity => {
      const component = entity['auto-upgrade'] as AutoUpgradeComponent
      if (component) {
        if (component.canAfford && component.cost <= component.gameState.coins) {
          component.gameState.coins -= component.cost
          component.gameState.coinsPerSecond += 0.1
          component.cost = Math.floor(component.cost * 1.1)
          component.level += 1
        }
      }
    })
  }
}

// 自动收益系统
export const autoIncomeSystem = {
  tag: 'auto-income',
  update: (entities: Entity[]) => {
    entities.forEach(entity => {
      const component = entity['auto-income'] as AutoIncomeComponent
      if (component) {
        component.gameState.coins += component.gameState.coinsPerSecond / 60 // 60 FPS
      }
    })
  }
}

// 创建游戏实体模板
export const createGameEntities = (gameState: GameState) => {
  const clickUpgradeEntity = {
    name: 'Click Upgrade',
    group: 'upgrades',
    components: [
      {
        tag: 'click-upgrade',
        level: 0,
        cost: 10,
        canAfford: true,
        gameState: gameState
      }
    ]
  }

  const autoUpgradeEntity = {
    name: 'Auto Upgrade',
    group: 'upgrades',
    components: [
      {
        tag: 'auto-upgrade',
        level: 0,
        cost: 50,
        canAfford: true,
        gameState: gameState
      }
    ]
  }

  const autoIncomeEntity = {
    name: 'Auto Income',
    group: 'income',
    components: [
      {
        tag: 'auto-income',
        gameState: gameState
      }
    ]
  }

  return {
    clickUpgradeEntity,
    autoUpgradeEntity,
    autoIncomeEntity
  }
}

// 游戏操作函数
export const gameActions = {
  // 点击赚取金币
  handleClick: (gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + prev.clickPower
    }))
  },

  // 购买点击升级
  buyClickUpgrade: (gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
    if (gameState.coins >= 10) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - 10,
        clickPower: prev.clickPower + 1,
        upgrades: {
          ...prev.upgrades,
          clickUpgrade: prev.upgrades.clickUpgrade + 1
        }
      }))
    }
  },

  // 购买自动升级
  buyAutoUpgrade: (gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
    if (gameState.coins >= 50) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - 50,
        coinsPerSecond: prev.coinsPerSecond + 0.1,
        upgrades: {
          ...prev.upgrades,
          autoUpgrade: prev.upgrades.autoUpgrade + 1
        }
      }))
    }
  }
}
