import * as THREE from 'three'
import { GameScene } from './gameScene'
import { Entity } from './scene'

interface SkyPayload {
  type: 'base'
}

function createHorizonGradientTexture(
  skyColor: string,
  groundColor: string,
  horizonY = 0.5,
  blend = 0.05,
  size = 1024
) {
  const canvas = document.createElement('canvas')
  canvas.width = size * 2 // equirectangular
  canvas.height = size
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)

  const start = Math.max(0, horizonY - blend)
  const end = Math.min(1, horizonY + blend)

  grad.addColorStop(0, skyColor)
  grad.addColorStop(start, skyColor)
  grad.addColorStop(end, groundColor)
  grad.addColorStop(1, groundColor)

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearFilter
  texture.mapping = THREE.EquirectangularReflectionMapping // 关键
  return texture
}

export class SkySystem {
  tag: 'sky' = 'sky' as const

  scene: GameScene | null = null

  update(entities: Entity[]) {
    const sky = entities[0].sky as SkyPayload
    if (sky.type === 'base') {
      this.applyBaseSky()
    }
  }

  applyBaseSky() {
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    const texture = createHorizonGradientTexture(
      '#70b6f5',
      '#e8e5e0',
      0.48,
      0.03
    )

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      fog: false,
    })
    const skySphere = new THREE.Mesh(geometry, material)
    this.scene?.threeScene?.add(skySphere)

    const color = 0xFFFFFF // white
    const near = 10
    const far = 100
    this.scene!.threeScene!.fog = new THREE.Fog(color, near, far)
  }

  init(scene: GameScene) {
    this.scene = scene
  }
}
