import { Map } from '@maptiler/sdk'
import * as maptilersdk from '@maptiler/sdk'
export function highlightAreaBuilding3D(map: Map, coordinates: [number, number]) {
  const bbox = [[coordinates[0] - 0.001, coordinates[1] - 0.001], [coordinates[0] + 0.001, coordinates[1] + 0.001]] as [maptilersdk.LngLatLike, maptilersdk.LngLatLike]
  const features = map.queryRenderedFeatures([
    map.project(bbox[0]),
    map.project(bbox[1])
  ], {
    layers: ['Building 3D']
  })

  if (features.length) {
    const ids: number[] = []
    for (const feature of features) {
      if (feature.layer.id === 'Building 3D' && feature.id) {
        ids.push(Number(feature.id))
      }
    }
    map.setFilter('Building 3D Highlight', ["in", ["id"], ["literal", ids]])
  }
}

export function searchByPointSize(map: Map, point: { x: number, y: number }, size: number) {
  const bbox = [
    [point.x - size, point.y - size], // 左上角
    [point.x + size, point.y + size]  // 右下角
  ]
  // @ts-expect-error
  const features = map.queryRenderedFeatures(bbox)
  return features
}
