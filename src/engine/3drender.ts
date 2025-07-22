import { WebGPURenderer } from 'three/src/Three.WebGPU.js'
import { VoxRoomScene } from './gameScene'
import * as THREE from 'three'

export class ThreeRender {
  id: '3DRender' = '3DRender' as const
  constructor() {

  }

  init(scene: VoxRoomScene) {
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

    // 简单地板材质
  const tileMaterial = new THREE.MeshBasicMaterial({ color: 0xaa1aaa });

  const gridSize = 8;
  const tilePixel = 32;
  const pixelPerUnit = 32; // 1单位=32像素
  const tileSize = tilePixel / pixelPerUnit; // 单位长度
  // 生成 8x8 地板块
  const offset = (gridSize * tileSize) / 2 - tileSize / 2;
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const tile = new THREE.Mesh(
          new THREE.PlaneGeometry(tileSize, tileSize),
          tileMaterial.clone()
        );
        // 交错着色
        if ((i + j) % 2 === 0) {
          tile.material.color.set(0xcccccc);
        } else {
          tile.material.color.set(0x888888);
        }
        // 计算位置，使中心为 (0,0,0)
        tile.position.x = i * tileSize - offset;
        tile.position.y = j * tileSize - offset;
        tile.position.z = 0;
        // tile.rotation.x = -Math.PI / 2; // 平铺在XY面上
        scene.threeScene.add(tile);
      }
    }
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.threeScene.add( cube )

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.threeScene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, -5, 10);
    scene.threeScene.add(dirLight);
  }

  render(scene: VoxRoomScene) {
    // 更新逻辑
    scene.renderer?.renderAsync(scene.threeScene!, scene.camera!)
  }
}

export default ThreeRender
