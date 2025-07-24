import * as THREE from 'three'
import { WebGPURenderer } from 'three/src/Three.WebGPU.js'
import { GameSceneOptions, Renderer, Scene, System } from './scene'
import ThreeRender from './3drender'
import { CameraSystem } from './cameraSystem'
import { LightingSystem } from './lightingSystem'
import { SkySystem } from './skySystem'

export class GameScene extends Scene {
  public camera: THREE.PerspectiveCamera | null = null
  public threeScene: THREE.Scene | null = null
  public renderer: WebGPURenderer | null = null
  constructor(options: GameSceneOptions) {
    super(options)
    this.store.set('domId', options.domId)
    this.store.set('width', options.width)
    this.store.set('height', options.height)

    this.addSystem(new CameraSystem() as unknown as System)
    this.addSystem(new LightingSystem() as unknown as System)
    this.addSystem(new SkySystem() as unknown as System)
    this.addRenderer(new ThreeRender() as unknown as Renderer)
    this.init()

    this.addEntity({
      group: 'camera',
      name: 'camera',
      components: [
        { tag: 'camera', position: { x: 7, y: 7, z: 7 }, control: true }
      ]
    })

    this.addEntity({
      group: 'lighting',
      name: 'ambientLight',
      components: [
        { tag: 'lighting', type: 'ambient', attributes: { color: 0xffffff, intensity: 0.2 } }
      ]
    })

    this.addEntity({
      group: 'lighting',
      name: 'directionalLight',
      components: [
        { tag: 'lighting', type: 'directional', attributes: { color: 0xffffff, intensity: 1 }, position: { x: 3, y: 5, z: 8 } }
      ]
    })

    this.addEntity({
      group: 'lighting',
      name: 'pointLight',
      components: [
        { tag: 'lighting', type: 'point', attributes: { color: 0xffeeaa, intensity: 0.5 }, position: { x: -5, y: 2, z: 5 } }
      ]
    })

    this.addEntity({
      group: 'sky',
      name: 'sky',
      components: [
        { tag: 'sky', type: 'base' }
      ]
    })
  }
}
