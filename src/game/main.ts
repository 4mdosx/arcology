import Character from './character'
import World from './world'
import OutPost from './outpost'

const modules = [Character, World, OutPost]
export class Game {
  data = {} as any
  modules = [] as Module[]
  tickLength = 1000 // 每秒更新一次游戏状态
  stopTimer = 0
  saveFlag = 0
  constructor() {
    this.init()
    console.log('Game is inited')
  }

  init () {
    this.load()
    // @ts-ignore
    this.modules = modules.map(M => new M(this))
    if (!this.data.offlineProgress || !this.data.lastTick) this.data.lastTick = performance.now()
    this.start(this.data.lastTick)
  }

  start (tFrame: number) {
    this.stopTimer = window.setTimeout(() => this.start(performance.now()), this.tickLength)
    const nextTick = this.data.lastTick + this.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
      const timeSinceTick = tFrame - this.data.lastTick
      numTicks = Math.floor(timeSinceTick / this.tickLength)
      if (numTicks > 60) numTicks = 60
    }

    for (let i = 0; i < numTicks; i++) {
      this.data.lastTick += this.tickLength
      this.tick()
    }
  }

  stop () {
    clearTimeout(this.stopTimer)
  }

  tick () {
    this.modules.forEach(module => module.tick && module.tick())
    this.saveFlag++
    if (this.saveFlag >= 120) {
      this.save()
      this.saveFlag = 0
      console.log('Game is saved')
    }
  }

  load () {
    const data = window.localStorage.getItem('arcology-save')
    if (data) {
      this.data = JSON.parse(data)
    }
  }

  save () {
    window.localStorage.setItem('arcology-save', JSON.stringify(this.data))
  }
}
