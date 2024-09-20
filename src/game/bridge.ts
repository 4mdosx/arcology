// @ts-nocheck
import { EnemySchema } from './schema/enemy'

export const dataBridge = {
  encounter: () => {
    // get 当前位置
    // get 玩家角色
    // get 敌人
    // const camp = this.camp.get()
    // const player = this.player.get()
    let type = ''
    if (Math.random() > 1) {
      type = 'battle'
      const enemy = [EnemySchema[0]]
      // init battle
    } else {
      type = 'gather'
      const camp = game.camp
      camp.gather()
    }

    return {
      type
    }
  }
}

export const bridgeWrapper = (f, moduleName)=> (set, get, store) => {
  Object.defineProperty(game, moduleName, {
    get () {
      return store.getState()
    }
  })
  window.bridge = dataBridge
  return f(set, get, store)
}
