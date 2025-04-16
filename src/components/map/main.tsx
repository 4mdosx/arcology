import { useEffect } from 'react'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import './map.css'
import { useWorldMap } from './useWorldMap'


export default function OpenLayersMap() {
  const worldMap = useWorldMap()
  useEffect(() => {
    if (worldMap.map) return
    worldMap.initMap()
    return () => {
      worldMap.removeMap()
    }
  }, [])

  return <div id="ol-map"></div>
}
