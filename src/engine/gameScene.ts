import { WebGPURenderer } from 'three/src/Three.WebGPU.js'
import { GameSceneOptions, Renderer, Scene, System } from './scene'
import ThreeRender from './3drender'
import { CameraSystem } from './cameraSystem'
import * as THREE from 'three'

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
    this.addRenderer(new ThreeRender() as unknown as Renderer)
    this.init()
  }
}
