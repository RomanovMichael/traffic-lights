<script setup>
import { useMapStore } from 'STORES'
import UiButton from 'primevue/button'

const mapStore = useMapStore()

const emit = defineEmits(['findOnMap'])

const props = defineProps({
  feature: {
    type: Object,
    required: true
  }
})

const findHandler = () => {
  emit('findOnMap', props.feature)
}
</script>

<template>
  <div
    class="map-popup p-card p-3 fadein w-20rem flex flex-column justify-content-between"
  >
    <div class="flex justify-content-between align-items-center mb-2">
      <div>
        <i
          class="pi pi-circle-fill mr-1"
          :style="`color:${feature.properties.color}`"
        />
        {{ feature.properties.status_text }}
      </div>
      <ui-button
        icon="pi pi-times "
        icon-pos="right"
        outlined
        @click="mapStore.setPopup()"
      />
    </div>
    <div class="map-popup__content overflow-scroll">
      <p
        v-for="[key, value] in Object.entries(feature.properties)"
        :key="key"
        class="text-sm"
      >
        {{ key }}: {{ value }}
      </p>
    </div>
    <ui-button
      label="Найти на карте"
      icon="pi pi-map-marker"
      icon-pos="right"
      class="mt-2"
      @click="findHandler"
    />
  </div>
</template>

<style lang="scss">
.map-popup {
  position: absolute;
  top: 5rem;
  left: 32px;
  height: auto;
  max-height: 30rem;

  &__content {
    max-height: calc(100% - 40px);
  }
}
</style>
