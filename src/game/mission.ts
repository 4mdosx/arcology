import  { v4 as uuidv4 } from 'uuid'
import { BuildingSchema } from './schema/building'
const initValue = {
  last_refresh_time: 0,
  current: null,
  issues: []
}

export default class Mission {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.mission = this

    if (game.data.mission === undefined) {
      game.data.mission = { ...initValue }
    }
  }

  check () {
  }

  accept (issue: any) {
    this.game.data.mission.current = {
      ...issue,
      status: 'accepted'
    }
  }


  generate () {
    // 同时只能接受有一个任务，完成任务后获取新的任务列表
    // 刷新任务功能，有十分钟冷却时间
    // 任务类型：
    // 1. 建筑任务, building
    // 2. 巡逻任务, ranger

    const currentBuildings = this.game.data.outpost.buildings
    const availableBuildings = BuildingSchema.filter(building => {
      return !currentBuildings.some((currentBuilding: any) => currentBuilding.name === building.name)
    })

    const issues = []
    issues.push({
      id: uuidv4(),
      type: 'building',
      building: availableBuildings[Math.floor(Math.random() * availableBuildings.length)],
      reward: 100,
      status: 'pending'
    }, {
      id: uuidv4(),
      type: 'building',
      building: availableBuildings[Math.floor(Math.random() * availableBuildings.length)],
      reward: 100,
      status: 'pending'
    })
    this.game.data.mission.issues = issues
    return issues
  }
}
