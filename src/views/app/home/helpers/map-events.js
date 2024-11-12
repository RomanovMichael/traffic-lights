import { defineAsyncComponent as DAC, h, render } from 'vue'
import { useMapStore } from 'STORES'
import { mapLayer } from '../configs'

const MapBalloon = DAC(() => import('../components/map-balloon/map-baloon.vue'))
const mapStore = useMapStore()

let balloonContainer = null
let currentFeatureId = null

export const handleMarkerClick = (event, map) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: [mapLayer.id]
  })

  if (features.length === 0) return

  const feature = features[0]
  mapStore.setPopup(feature)
}

export const handleMouseMove = (event, map) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: [mapLayer.id]
  })

  if (features.length > 0) {
    const feature = features[0]
    const featureId = feature.id || feature.properties.id // Используем уникальный идентификатор объекта
    const coordinates = feature.geometry.coordinates.slice()

    // Если мы на том же маркере, не обновляем балун
    if (currentFeatureId === featureId) {
      return
    }

    currentFeatureId = featureId // Сохраняем текущий маркер

    // Убираем старый балун, если он существует
    if (balloonContainer && document.body.contains(balloonContainer)) {
      document.body.removeChild(balloonContainer)
      balloonContainer = null
    }

    // Проверяем координаты и добавляем новый балун
    if (Array.isArray(coordinates) && coordinates.length === 2) {
      balloonContainer = document.createElement('div')

      const vnode = h(MapBalloon, { feature })
      render(vnode, balloonContainer)

      const pixelCoords = map.project(coordinates)
      balloonContainer.style.position = 'absolute'
      balloonContainer.style.transform = `translate(${pixelCoords.x + 16}px, ${pixelCoords.y + 16}px)`

      document.body.appendChild(balloonContainer)
      map.getCanvas().style.cursor = 'pointer'
    }
  } else {
    // Если нет фич под курсором, убираем балун
    if (balloonContainer && document.body.contains(balloonContainer)) {
      document.body.removeChild(balloonContainer)
      balloonContainer = null
      currentFeatureId = null // Сбрасываем текущий маркер
      map.getCanvas().style.cursor = ''
    }
  }
}

export const handleMouseLeave = map => {
  if (balloonContainer && document.body.contains(balloonContainer)) {
    document.body.removeChild(balloonContainer)
    balloonContainer = null
  }

  currentFeatureId = null // Сбрасываем текущий маркер при уходе с карты
  map.getCanvas().style.cursor = ''
}
