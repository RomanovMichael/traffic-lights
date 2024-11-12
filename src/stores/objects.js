import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GET } from 'API'
import { statuses } from 'CONFIGS'

export const useObjectsStore = defineStore('objects', () => {
  const data = ref([])

  const objects = computed(() =>
    data.value.map(obj => ({
      ...obj,
      status_info: statuses[obj.status_id] || statuses[4]
    }))
  )

  const geoObjects = computed(() => ({
    type: 'FeatureCollection',
    features: objects.value.map(obj => ({
      type: 'Feature',
      id: obj.id,
      geometry: {
        type: 'Point',
        coordinates: obj.geom.coordinates
      },
      properties: {
        id: obj.id,
        status: obj.status_info.id,
        status_text: obj.status_info.label,
        color: obj.status_info.color,
        ...obj.attrs
      }
    }))
  }))

  const getObjects = async () => {
    try {
      const response = await GET('/data.json')
      data.value = response
    } catch (e) {
      throw e
    }
  }

  return {
    objects,
    getObjects,
    geoObjects
  }
})
