import { v4 as uuidv4 } from 'uuid'

export interface Entity {
  id: string
  componentTags: string[]
  [key: string]: any
}

export interface EntityTemplate {
  group: string
  components: Component[]
}

interface Component {
  tag: string
  [key: string]: any
}

interface System {
  tag: string
  update: (entities: Entity[]) => void
}

interface Renderer {
  id: string
  render: (scene: Scene, tFrame: number) => void
}

export class Scene {
  private systems: System[] = []
  private renderers: Renderer[] = []
  private stopMainLoopFlag = 0
  private lastTick = 0
  private tickLength = 1000 / 30
  private componentsMap: Map<string, Entity[]> = new Map()
  private groupsMap: Map<string, Entity[]> = new Map()
  private offScreenMaxTicks = 30

  constructor() {
    (window as any).scene = this
  }

  mainLoop(tFrame: number) {
    this.stopMainLoopFlag = window.requestAnimationFrame((f) => this.mainLoop(f))

    if (tFrame - this.lastTick > this.tickLength) {
      const numTicks = Math.floor((tFrame - this.lastTick) / this.tickLength)
      this.queueUpdates(numTicks)
      this.lastTick = this.lastTick + this.tickLength * numTicks
    }

    this.render()
  }

  queueUpdates(numTicks: number) {
    numTicks = Math.min(numTicks, this.offScreenMaxTicks) //
    for (let i = 0; i < numTicks; i++) {
      this.update()
    }
  }

  update() {
    for (const system of this.systems) {
      system.update(this.componentsMap.get(system.tag) || [])
    }
  }

  render() {
    for (const renderer of this.renderers) {
      renderer.render(this, this.lastTick)
    }
  }

  addEntity(entity: EntityTemplate) {
    const emptyEntity: Entity = {
      id: uuidv4(),
      componentTags: []
    }
    entity.components.forEach(component => {
      emptyEntity.componentTags.push(component.tag)
      emptyEntity[component.tag] = { ...component }
      const entities = this.componentsMap.get(component.tag) || []
      entities.push(emptyEntity)
      this.componentsMap.set(component.tag, entities)
    })
    const entities = this.groupsMap.get(entity.group) || []
    entities.push(emptyEntity)
    this.groupsMap.set(entity.group, entities)
  }

  deleteEntity(entity: Entity) {
    const entities = this.groupsMap.get(entity.group)
    if (entities) {
      const index = entities.indexOf(entity)
      if (index > -1) {
        entities.splice(index, 1)
      }
    }

    for (const tag of entity.componentTags) {
      const entities = this.componentsMap.get(tag)
      if (entities) {
        const index = entities.indexOf(entity)
        if (index > -1) {
          entities.splice(index, 1)
        }
      }
    }
  }

  getEntitiesByTag(tag: string) {
    return this.componentsMap.get(tag) || []
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

  addRenderer(renderer: Renderer) {
    this.renderers.push(renderer)
  }

  deleteRenderer(renderer: Renderer) {
    const index = this.renderers.indexOf(renderer)
    if (index > -1) {
      this.renderers.splice(index, 1)
    }
  }

  start() {
    const now = window.performance.now()
    this.lastTick = now
    this.mainLoop(now)
  }

  stop() {
    window.cancelAnimationFrame(this.stopMainLoopFlag)
  }
}
