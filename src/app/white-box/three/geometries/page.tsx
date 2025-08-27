'use client'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { useEffect, useRef } from 'react'
import { initScene } from '../bootstrap'
import { intializeRendererControls } from '../controls/renderer-control.js'
import { initializeSceneControls } from '../controls/scene-controls.js'

export default function GeometriesPage() {
  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const props = {
      backgroundColor: '#000000',
      fogColor: '#000000',
      rootDOM: 'three-container',
    }
    const gui = new GUI()
    initScene(props)((scene, camera, renderer, orbitControls) => {
      const geometry = new THREE.BoxGeometry()
      const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff })
      const cube = new THREE.Mesh(geometry, cubeMaterial)

      cube.position.x = -1
      cube.castShadow = true
      scene.add(cube)

      const torusKnotGeom = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 100)
      const torusKnotMat = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        roughness: 0.1,
      })
      const torusKnotMesh = new THREE.Mesh(torusKnotGeom, torusKnotMat)
      torusKnotMesh.castShadow = true
      torusKnotMesh.position.x = 2
      scene.add(torusKnotMesh)

      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2
      orbitControls?.update()

      // foreverPlane(scene)
      let step = 0
      function animate() {
        // requestAnimationFrame(animate)
        renderer.render(scene, camera)
        // stats.update();
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        cube.rotation.z += 0.01

        torusKnotMesh.rotation.x -= 0.01
        torusKnotMesh.rotation.y += 0.01
        torusKnotMesh.rotation.z -= 0.01

        // uncomment this to have the cube jump around
        step += 0.01
        cube.position.x = 4 * Math.cos(step)
        cube.position.y = 4 * Math.abs(Math.sin(step))

        orbitControls?.update()
      }
      animate()

      intializeRendererControls(gui, renderer)
      initializeSceneControls(gui, scene, false, false)
    })
  }, [])

  return (
    <div id="three-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div ref={node}></div>
    </div>
  )
}
