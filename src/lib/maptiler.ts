import { Map } from '@maptiler/sdk'

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

