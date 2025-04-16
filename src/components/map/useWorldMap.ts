import { create } from 'zustand'
import * as maptilersdk from '@maptiler/sdk'
import { createMap } from './core'

export const useWorldMap = create<{
  map: maptilersdk.Map | null
  count: number
  increment: () => void
  initMap: () => void
  removeMap: () => void
  loadModels: () => void
}>((set, get) => ({
  map: null,
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  initMap: async () => {
    console.log('initMap')
    const map = await createMap({
      center: [121.50100, 31.21977],
      zoom: 15.5
    })
    // @ts-expect-error
    window.map = map
    set({ map })
  },
  removeMap: () => {
    get().map?.remove()
    set({ map: null })
  },
  loadModels: () => {
    const map = get().map
    if (!map) return
    const layer = map.getLayer('3d-model')
    const center = map.getCenter()
    if (!layer) return
    console.log(layer)
    // @ts-expect-error
    layer.implementation.loadModels([
      {
        url: 'https://docs.maptiler.com/sdk-js/assets/34M_17/34M_17.gltf',
        position: center,
        altitude: 0,
        rotation: [Math.PI / 2, 0, 0],
        scale: 1
      },
    ])
    map.triggerRepaint()
  }
}))
