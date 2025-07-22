import * as THREE from 'three'
import { GameScene } from './gameScene'
import { Entity } from './scene'

interface LightingEntity {
  type: 'ambient' | 'directional'
  attributes: {
    color: number
    intensity: number
    [key: string]: unknown
  },
  position?: { x: number, y: number, z: number }
}


export class LightingSystem {
  tag: 'lighting' = 'lighting' as const

  scene: GameScene | null = null
  lights: Map<string, THREE.Light> = new Map()

  update(entities: Entity[]) {
    for (const entity of entities) {
      const light = this.lights.get(entity.id)
      if (light) {
        this.updateLight(light, entity.lighting as LightingEntity)
      } else {
        const light = this.createLight(entity.lighting as LightingEntity)
        if (light) {
          this.lights.set(entity.id, light)
          this.scene?.threeScene?.add(light)
        }
      }
    }
  }

  createLight(entity: LightingEntity): THREE.Light | null {
    if (entity.type === 'ambient') {
      const light = new THREE.AmbientLight(entity.attributes.color, entity.attributes.intensity)
      return light
    } else if (entity.type === 'directional') {
      const light = new THREE.DirectionalLight(entity.attributes.color, entity.attributes.intensity)
      if (entity.position) {
        light.position.set(entity.position.x, entity.position.y, entity.position.z)
      }
      return light
    } else if (entity.type === 'point') {
      const light = new THREE.PointLight(entity.attributes.color, entity.attributes.intensity)
      if (entity.position) {
        light.position.set(entity.position.x, entity.position.y, entity.position.z)
      }
      return light
    }
    return null
  }

  updateLight(light: THREE.Light, entity: LightingEntity) {
    const attributes = entity.attributes
    for (const key in attributes) {
      // @ts-expect-error update light attributes
      light[key] = attributes[key]
    }
    if (entity.position) {
      light.position.set(entity.position.x, entity.position.y, entity.position.z)
    }
  }

  init (scene: GameScene) {
    this.scene = scene
  }
}
