<script setup>
import { ref, defineAsyncComponent as DAC, onMounted, watch } from 'vue'
import { useMapStore } from 'STORES'
import { mapLayer, defaultMapOptions } from '../../configs'
import {
  initializeMap,
  handleMarkerClick,
  handleMouseMove,
  handleMouseLeave
} from '../../helpers'

const MapPopup = DAC(() => import('../map-popup/map-popup.vue'))
const mapStore = useMapStore()

const map = ref(null)

const setSource = () => {
  const { name, data } = mapStore.mapSource

  if (!map.value.getSource(name)) {
    map.value.addSource(name, {
      type: 'geojson',
      data
    })
  } else {
    map.value.getSource(name).setData(data)
  }
}

const setLayer = () => {
  if (map.value.getLayer(mapLayer.id)) return

  map.value.addLayer(mapLayer)
}

const setMarkerState = (id, state) => {
  map.value.setFeatureState(
    { source: mapStore.mapSource.name, id },
    { active: state }
  )
}

const flyToMarker = feature => {
  if (!map.value) return

  if (feature) {
    const coordinates = feature.geometry.coordinates.slice()
    map.value.flyTo({
      center: coordinates,
      zoom: 17,
      speed: 2,
      curve: 1,
      essential: true
    })
  } else {
    map.value.flyTo({
      center: defaultMapOptions.center,
      zoom: defaultMapOptions.zoom,
      speed: 2,
      curve: 1,
      essential: true
    })
  }
}

const initMap = () => {
  if (map.value) return

  map.value = initializeMap('map', defaultMapOptions)
  map.value.on('load', () => {
    setSource(mapStore.mapSource)
    setLayer()

    map.value.on('mousemove', e => handleMouseMove(e, map.value))
    map.value.on('mouseleave', e => handleMouseLeave(e, map.value))
    map.value.on('click', e => handleMarkerClick(e, map.value))
  })
}

watch(
  () => mapStore.mapPopup,
  (newVal, oldVal) => {
    if (oldVal) setMarkerState(oldVal.id, false)

    if (newVal) {
      setMarkerState(newVal.id, true)
      flyToMarker(newVal)
    } else {
      flyToMarker()
    }
  }
)

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="home-map">
    <div id="map" />
    <map-popup
      v-if="mapStore.mapPopup"
      :feature="mapStore.mapPopup"
      @find-on-map="e => flyToMarker(e)"
    />
  </div>
</template>

<style lang="scss">
#map {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.mapboxgl-ctrl-top-right {
  top: 50% !important;
  transform: translateY(-50%);
}
</style>
