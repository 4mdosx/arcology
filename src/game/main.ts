import Character from './character'

const modules = [Character]
class Game {
  data = {} as any
  modules = [] as Module[]
  tickLength = 100
  stopTimer = 0
  saveFlag = 0
  constructor() {
    this.init()
    console.log('Game is running')
  }

  init () {
    this.load()
    // @ts-ignore
    this.modules = modules.forEach(Module => new Module(this))
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
    }

    for (let i = 0; i < numTicks; i++) {
      this.data.lastTick += this.tickLength
      this.tick()
    }
  }

  tick () {
    this.modules.forEach(module => module.tick())
    this.saveFlag++
    if (this.saveFlag >= 600) {
      this.save()
      this.saveFlag = 0
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
