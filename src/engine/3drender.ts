import { WebGPURenderer } from 'three/webgpu'
import { GameScene } from './gameScene'
import * as THREE from 'three'

export class ThreeRender {
  id: '3DRender' = '3DRender' as const
  constructor() {}

  init(scene: GameScene) {
    const domId = scene.store.get('domId') as string
    const canvas = document.getElementById(domId)
    if (!canvas) {
      throw new Error(`Canvas with id ${domId} not found`)
    }
    const width = scene.store.get('width') as number
    const height = scene.store.get('height') as number
    scene.threeScene = new THREE.Scene()

    scene.renderer = new WebGPURenderer({ antialias: true })
    scene.renderer.setSize(width, height)
    canvas.appendChild(scene.renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4ec3ff,
      roughness: 0.4,
      metalness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.threeScene.add(cube)

    // 简单地板材质
  //   const tileMaterial = new THREE.MeshStandardMaterial({
  //     color: 0x00ff00,
  //     roughness: 0.5,
  //     metalness: 0.3
  //   })

  // const gridSize = 8;
  // const tilePixel = 32;
  // const pixelPerUnit = 32; // 1单位=32像素
  // const tileSize = tilePixel / pixelPerUnit; // 单位长度
  // // 生成 8x8 地板块
  // const offset = (gridSize * tileSize) / 2 - tileSize / 2;
  // for (let i = 0; i < gridSize; i++) {
  //     for (let j = 0; j < gridSize; j++) {
  //       const tile = new THREE.Mesh(
  //         new THREE.PlaneGeometry(tileSize, tileSize),
  //         tileMaterial.clone()
  //       );
  //       // 交错着色
  //       if ((i + j) % 2 === 0) {
  //         tile.material.color.set(0xcccccc);
  //       } else {
  //         tile.material.color.set(0x888888);
  //       }
  //       // 计算位置，使中心为 (0,0,0)
  //       tile.position.x = i * tileSize - offset;
  //       tile.position.y = j * tileSize - offset;
  //       tile.position.z = 0;
  //       // tile.rotation.x = -Math.PI / 2; // 平铺在XY面上
  //       scene.threeScene.add(tile);
  //     }
  //   }
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.threeScene.add( cube )
  }

  render(scene: GameScene) {
    scene.renderer?.renderAsync(scene.threeScene!, scene.camera!)
  }
}

export default ThreeRender
