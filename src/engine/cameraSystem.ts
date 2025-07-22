import * as THREE from 'three'
import { GameScene } from './gameScene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Entity } from './scene'

interface CameraPayload {
  control: boolean
  position: { x: number, y: number, z: number }
}
export class CameraSystem {
  tag: 'camera' = 'camera' as const
  controls: OrbitControls | null = null
  scene: GameScene | null = null

  update(entities: Entity[], scene: GameScene) {
    const camera = entities[0].camera as CameraPayload
    scene.camera?.position.set(camera.position.x, camera.position.y, camera.position.z)
    if (camera.control) {
      this.controls = new OrbitControls(scene.camera!, scene.renderer!.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.05
      this.controls.minDistance = 1
      this.controls.maxDistance = 100
      this.controls.minPolarAngle = Math.PI / 4
      this.controls.maxPolarAngle = (3 * Math.PI) / 4
    }
  }

  init (scene: GameScene) {
    this.scene = scene
    const width = scene.store.get('width') as number
    const height = scene.store.get('height') as number
    const aspect = width / height
    const camera = new THREE.PerspectiveCamera(
      60, // pov
      aspect,
      0.1, // near
      1000 // far
    )
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, 0)
    scene.camera = camera
  }
}