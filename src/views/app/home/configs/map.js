import { useMapStore } from 'STORES'

const mapStore = useMapStore()

export const defaultMapOptions = {
  zoom: 12,
  center: [40.3966, 56.1366]
}

export const mapLayer = {
  id: 'traffic_lights',
  type: 'circle',
  source: mapStore.mapSource.name,
  paint: {
    'circle-color': ['get', 'color'],
    'circle-radius': [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      12, // Радиус активного маркера
      8 // Радиус остальных маркеров
    ],
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'active'], false],
      4, // Ширина границы для активного маркера
      0 // Без границы для остальных маркеров
    ],
    'circle-stroke-color': '#ffffff'
  }
}
