import * as THREE from 'three'
import { initLighting } from './lighting'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initOrbitControls } from './utils/orbit-controller'

export const initScene = ({
  backgroundColor,
  fogColor,
  disableShadows = false,
  disableLights = false,
  disableDefaultControls = false,
  rootDOM,
}: {
  backgroundColor: string
  fogColor: string
  disableShadows?: boolean
  disableLights?: boolean
  disableDefaultControls?: boolean
  rootDOM?: string
}) => {
  const init = (
    fn: (
      scene: THREE.Scene,
      camera: THREE.Camera,
      renderer: THREE.WebGLRenderer,
      orbitControls?: OrbitControls
    ) => void
  ) => {
    // basic scene setup
    const scene = new THREE.Scene()
    if (backgroundColor) {
      scene.background = new THREE.Color(backgroundColor)
    }

    if (fogColor) {
      scene.fog = new THREE.Fog(fogColor, 0.0025, 50)
    }

    // setup camera and basic renderer
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.VSMShadowMap
    renderer.setClearColor(new THREE.Color(backgroundColor))

    renderer.setSize(window.innerWidth, window.innerHeight)
    if (rootDOM) {
      document.getElementById(rootDOM)?.appendChild(renderer.domElement)
    } else {
      document.body.appendChild(renderer.domElement)
    }

    // initialize orbit controls
    let orbitControls
    if (!disableDefaultControls) {
      orbitControls = initOrbitControls(camera, renderer)
    }

    // add some basic lighting to the scene
    if (!disableLights) {
      initLighting(scene, { disableShadows })
    }

    fn(scene, camera, renderer, orbitControls)
  }

  return init
}
