import * as maptilersdk from '@maptiler/sdk'
import { getMaptilerKey } from '@/app/actions/map'

interface Position {
  center: [number, number]
  zoom: number
}

export async function createMap(initialPosition: Position) {
  const { api_key, style_key } = await getMaptilerKey()
  maptilersdk.config.apiKey = api_key
  const map = new maptilersdk.Map({
    style:
      'https://api.maptiler.com/maps/01961634-4705-7c15-8e71-6fed75336b3a/style.json?key=' +
      style_key,
    center: initialPosition.center,
    zoom: initialPosition.zoom,
    pitch: 45,
    bearing: -17.6,
    container: 'ol-map',
    canvasContextAttributes: { antialias: true },
  })

  map.on('style.load', async function () {
    // register costom layer

    // register click event
    map.on('click', function (e) {
      console.log(e)
    })
  })

  return map
}
