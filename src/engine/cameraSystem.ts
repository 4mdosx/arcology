import * as THREE from 'three'
import { VoxRoomScene } from './gameScene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Entity } from './scene'

interface CameraPayload {
  control: boolean
}
export class CameraSystem {
  tag: 'camera' = 'camera' as const

  controls: OrbitControls | null = null
  scene: VoxRoomScene | null = null

  update(entities: Entity[], scene: VoxRoomScene) {
    const camera = entities[0].camera as CameraPayload
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

  init (scene: VoxRoomScene) {
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
    camera.position.set(0, -5, 6)
    camera.lookAt(0, 0, 0)
    scene.camera = camera
    scene.addEntity({
      group: 'camera',
      name: 'camera',
      components: [
        { tag: 'camera', position: { x: 0, y: 0, z: 0 }, control: true }
      ]
    })
  }
}