import { useEffect, useRef } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import './map.css'
import { getMaptilerKey } from '@/app/actions/map'
import { create } from 'zustand'

async function mount(center: [number, number], zoom: number) {
  const { api_key, style_key } = await getMaptilerKey()
  maptilersdk.config.apiKey = api_key
  var map = new maptilersdk.Map({
    style: 'https://api.maptiler.com/maps/01961634-4705-7c15-8e71-6fed75336b3a/style.json?key=' + style_key,
    center: center,
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    container: 'ol-map',
    // @ts-expect-error
    antialias: true
  })
  // highlight buildings on click
  map.on('click', function (e) {

  })
  return map
}

interface OpenLayersMapProps {
  center: [number, number]
  zoom: number
}

const useMapStore = create<{
  map: maptilersdk.Map | null
}>((set) => ({
  map: null
}))

export default function OpenLayersMap({ center, zoom }: OpenLayersMapProps) {
  const mapStore = useMapStore()
  useEffect(() => {
    if (mapStore.map) return
    mount(center, zoom).then((map) => {
      mapStore.map = map
    })
    return () => {
      mapStore.map?.remove()
    }
  }, [])

  return <div id="ol-map"></div>
}
