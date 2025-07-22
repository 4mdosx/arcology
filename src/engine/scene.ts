import { v4 as uuidv4 } from 'uuid'
import Stats from 'stats.js'
export interface Entity {
  id: string
  name: string
  componentTags: string[]
  [key: string]: unknown
}

export interface EntityTemplate {
  name?: string
  group: string
  components: Component[]
}

interface Component {
  tag: string
  [key: string]: unknown
}

export interface System {
  tag: string
  update: (entities: Entity[], scene: Scene) => void
  init?: (scene: Scene) => void
}

export interface Renderer {
  id: string
  render: (scene: Scene) => void
  init?: (scene: Scene) => void
}

export interface GameSceneOptions {
  domId: string
  width: number
  height: number
  inactiveTime: number
  dev: boolean
  maxFPS: number
  maxTick: number
}

export class Scene {
  public store = new Map<string, unknown>()
  private maxFPS = 30
  private tickLength = 1000 / 30
  private lastTick = 0
  private accumulatorMax = 1000 / 30 * 30
  private isActive = true
  private lastActiveTime = Date.now()
  private inactiveTime: number = 30 * 1000
  private systems: System[] = []
  private renderers: Renderer[] = []
  private stopMainLoopFlag = 0
  private groupsMap: Map<string, Entity[]> = new Map()
  private dirtyEntities: Map<string, Set<Entity>> = new Map()
  private stats: Stats | null = null

  constructor(options: GameSceneOptions) {
    if (options.dev) {
      ;(window as unknown as { scene: Scene }).scene = this
      this.stats = new Stats()
      this.stats.showPanel(0)
      document.body.appendChild(this.stats.dom)
    }
    this.maxFPS = options.maxFPS || 30
    this.tickLength = 1000 / this.maxFPS
    this.accumulatorMax = this.tickLength * (options.maxTick || 30)
    this.lastTick = window.performance.now()
    this.inactiveTime = options.inactiveTime || 30 * 1000

    ;['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel']
      .forEach(evt => window.addEventListener(evt, () => {
        this.lastActiveTime = window.performance.now()
      }, { passive: true }))
  }

  mainLoop() {
    const now = performance.now()
    let accumulator = now - this.lastTick
    if (accumulator > this.accumulatorMax) {
      accumulator = this.accumulatorMax
    }
    this.lastTick = now

    while (accumulator >= this.tickLength) {
      this.update()
      accumulator -= this.tickLength
    }

    if (this.isActive) {
      this.render()
    }
    if (now - this.lastActiveTime > this.inactiveTime) {
      this.isActive = false
    } else {
      this.isActive = true
    }

    this.stopMainLoopFlag = window.requestAnimationFrame(() => this.mainLoop())
  }

  update() {
    for (const system of this.systems) {
      const dirtyEntities = Array.from(this.dirtyEntities.get(system.tag) || [])
      if (dirtyEntities.length > 0) {
        system.update(dirtyEntities, this)
        this.dirtyEntities.delete(system.tag)
      }
    }
  }

  render() {
    this.stats?.begin()
    for (const renderer of this.renderers) {
      renderer.render(this)
    }
    this.stats?.end()
  }

  addEntity(entity: EntityTemplate) {
    const emptyEntity: Entity = {
      id: uuidv4(),
      name: entity.name || 'unnamed',
      componentTags: entity.components.map(component => component.tag)
    }
    entity.components.forEach(component => {
      emptyEntity[component.tag] = { ...component }
    })
    const entities = this.groupsMap.get(entity.group) || []
    entities.push(emptyEntity)
    this.groupsMap.set(entity.group, entities)
    this.markDirty(emptyEntity)
  }

  deleteEntity(entity: Entity) {
    const entities = this.groupsMap.get(entity.group as string)
    if (entities) {
      const index = entities.indexOf(entity)
      if (index > -1) {
        entities.splice(index, 1)
      }
    }
  }

  markDirty(entity: Entity) {
    entity.componentTags.forEach(tag => {
      const dirtyEntities = this.dirtyEntities.get(tag) || new Set()
      dirtyEntities.add(entity)
      this.dirtyEntities.set(tag, dirtyEntities)
    })
  }

  getEntitiesByGroup(group: string) {
    return this.groupsMap.get(group) || []
  }

  addSystem(system: System) {
    this.systems.push(system)
  }

  deleteSystem(system: System) {
    const index = this.systems.indexOf(system)
    if (index > -1) {
      this.systems.splice(index, 1)
    }
  }

  getSystemByTag(tag: string) {
    return this.systems.find(system => system.tag === tag)
  }

  addRenderer(renderer: Renderer) {
    this.renderers.push(renderer)
  }

  deleteRenderer(renderer: Renderer) {
    const index = this.renderers.indexOf(renderer)
    if (index > -1) {
      this.renderers.splice(index, 1)
    }
  }

  init() {
    for (const system of this.systems) {
      system.init?.(this)
    }
    for (const renderer of this.renderers) {
      renderer.init?.(this)
    }
  }

  start() {
    this.lastTick = window.performance.now()
    this.lastActiveTime = window.performance.now()
    this.mainLoop()
  }

  stop() {
    window.cancelAnimationFrame(this.stopMainLoopFlag)
  }
}
