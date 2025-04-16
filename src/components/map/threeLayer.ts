import * as THREE from 'three'
import * as maptilersdk from '@maptiler/sdk'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

interface ModelConfig {
  url: string
  position: [number, number]
  altitude: number
  rotation: [number, number, number]
  scale?: number
}

export class ThreeLayer implements maptilersdk.CustomLayerInterface {
  id = '3d-model'
  type = 'custom' as const
  renderingMode = '3d' as const
  camera: THREE.Camera
  scene: THREE.Scene
  // @ts-expect-error
  renderer: THREE.WebGLRenderer
  // @ts-expect-error
  map: maptilersdk.Map
  models: THREE.Object3D[] = []
  modelConfigs: ModelConfig[] = []

  constructor() {
    this.camera = new THREE.Camera()
    this.scene = new THREE.Scene()
  }

  loadModels(models: ModelConfig[]) {
    const loader = new GLTFLoader()
    this.scene.clear()
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, -70, 100).normalize()
    this.scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff)
    directionalLight2.position.set(0, 70, 100).normalize()
    this.scene.add(directionalLight2)
    models.forEach((modelConfig) => {
      loader.load(modelConfig.url, (gltf: any) => {
        const model = gltf.scene
        this.scene.add(model)
        this.modelConfigs.push(modelConfig)
      })
    })
  }

  onAdd(map: maptilersdk.Map, gl: WebGLRenderingContext) {
    this.map = map
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    })
    this.renderer.autoClear = false
  }

  render(gl: WebGLRenderingContext, args: any) {
    this.modelConfigs.forEach((modelConfig) => {
      const modelAsMercatorCoordinate =
        maptilersdk.MercatorCoordinate.fromLngLat(
          modelConfig.position,
          modelConfig.altitude
        )

      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelConfig.rotation[0],
        rotateY: modelConfig.rotation[1],
        rotateZ: modelConfig.rotation[2],
        scale:
          modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() *
          (modelConfig.scale || 1),
      }

      var rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      )
      var rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      )
      var rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      )

      var m = new THREE.Matrix4().fromArray(
        args.defaultProjectionData.mainMatrix
      )
      var l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ)

      this.camera.projectionMatrix = m.multiply(l)
      this.renderer.resetState()
      this.renderer.render(this.scene, this.camera)
      this.map.triggerRepaint()
    })
  }
}
