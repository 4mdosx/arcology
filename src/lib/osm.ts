import { LngLat } from "@maptiler/sdk"

// EPSG:3857 投影系统， 往东 增加 往北，y 减少
export function lon2tile(lon: number, zoom: number) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom))
}

export function lat2tile(lat: number, zoom: number) {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  )
}

// 反转 y 坐标
export function clat2tile(y_original: number, zoom: number) {
  return 2 ** zoom - 1 - y_original
}

export function coordinate2tile(coordinate: LngLat, zoom: number) {
  const x = lon2tile(coordinate.lng, zoom)
  const y = clat2tile(lat2tile(coordinate.lat, zoom), zoom)
  return [x, y]
}

export function tile2coordinate(tile: [number, number], zoom: number) {
  // 2 ** zoom - 1 - y_original 逆向操作
  const y_original = 2 ** zoom - 1 - tile[1]
  const lon = (tile[0] / Math.pow(2, zoom)) * 360 - 180
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - 2 * y_original/ Math.pow(2, zoom)))) * 180) / Math.PI
  return [lon, lat]
}
