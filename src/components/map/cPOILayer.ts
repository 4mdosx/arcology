// map.addSource('custom-poi', {
//   type: 'geojson',
//   data: {
//     type: 'FeatureCollection',
//     features: [
//       {
//         "type": "Feature",
//         "geometry": {
//             "type": "Point",
//             "coordinates": [2.34090194106102, 48.856414043180365]
//         },
//         "properties": {
//             "name": "POI 1",
//             "icon": "marker" // 自定义图标类型
//         }
//       }
//     ]
//   }
// })
// map.addLayer({
//     id: 'custom-poi-layer',
//     type: 'symbol',
//     source: 'custom-poi',
//     layout: {
//         'icon-image': '{icon}-15', // 使用 MapTiler 的默认图标样式
//         'text-field': '{name}', // 显示 POI 的名称
//         'text-offset': [0, 1],
//         'text-anchor': 'top'
//     },
//     paint: {
//         'text-color': '#000000' // 自定义文本颜色
//     }
// });