import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useObjectsStore } from './objects'

const objectStore = useObjectsStore()

export const useMapStore = defineStore('map', () => {
  const mapPopup = ref(null)

  const mapSource = computed(() => ({
    name: 'geoObjects',
    data: objectStore.geoObjects
  }))

  const setPopup = (feature = null) => {
    mapPopup.value = feature
  }

  return {
    mapPopup,
    mapSource,
    setPopup
  }
})
