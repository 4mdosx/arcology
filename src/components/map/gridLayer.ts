import * as maptilersdk from '@maptiler/sdk'
import { LngLatBounds } from '@maptiler/sdk'
import { coordinate2tile, tile2coordinate } from '@/lib/osm'

export function registerGridLayer(map: maptilersdk.Map) {
  map.addSource('tile-boundaries', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  })

  map.addLayer({
    id: 'tile-boundaries-layer',
    type: 'line',
    source: 'tile-boundaries',
    paint: {
      'line-color': 'rgba(179, 205, 41, .3)',
      'line-width': 1
    }
  })


  map.addLayer({
    id: 'tile-background-layer',
    type: 'fill-extrusion',
    source: 'tile-boundaries',
    paint: {
      'fill-extrusion-color': 'rgba(128, 128, 128, 0.5)', // 半透明灰色
      'fill-extrusion-height': 50, // 高度 100 米
      'fill-extrusion-base': 0, // 基础高度
      'fill-extrusion-opacity': 0.8 // 透明度
    },
    // filter: ['==', 'visible', true]
  })

  function updateTileBoundaries() {
    let zoom = map.getZoom()
    const bounds = map.getBounds()
    const tileBounds = zoom < 14 ? [] : getVisibleTileBounds(bounds, 19)
    let source = map.getSource('tile-boundaries')!! as maptilersdk.GeoJSONSource
    source.setData({
      type: 'FeatureCollection',
      features: tileBounds as any,
    })

  }

  // 初次渲染瓦片边界
  updateTileBoundaries()

  map.on('moveend', updateTileBoundaries)
}

// 计算当前视图范围内的瓦片边界
function getVisibleTileBounds(bounds: LngLatBounds, zoomLevel: number) {
  const minTile = coordinate2tile(bounds.getSouthWest(), zoomLevel)
  const maxTile = coordinate2tile(bounds.getNorthEast(), zoomLevel)
  const tileBounds = []
  const buffer = 10
  for (let x = minTile[0] - buffer; x <= maxTile[0] + buffer; x++) {
    for (let y = minTile[1] - buffer; y <= maxTile[1] + buffer; y++) {
      tileBounds.push({
        type: 'Feature',
        properties: {
          state: {
            x: x,
            y: y,
            zoom: zoomLevel,
          },
          visible: false
        },
        geometry: { type: 'Polygon', coordinates: [
          [
            tile2coordinate([x, y], zoomLevel),
            tile2coordinate([x, y + 1], zoomLevel),
            tile2coordinate([x + 1, y + 1], zoomLevel),
            tile2coordinate([x + 1, y], zoomLevel),
            tile2coordinate([x, y], zoomLevel),
          ],
        ] },
      })
    }
  }

  return tileBounds
}
