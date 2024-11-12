<script setup>
import { defineAsyncComponent as DAC, ref, computed } from 'vue'
import { useObjectsStore } from 'STORES'

const objectsStore = useObjectsStore()
const objectsList = DAC(() => import('./components/objects-list.vue'))
const filterText = ref(null)

const filteredFeatures = computed(() => {
  const features = objectsStore.geoObjects.features
  const query = filterText.value?.trim()?.toLowerCase()

  if (!query) return features

  const fields = ['address', 'status_text']

  return features?.filter(feature => {
    return fields.some(field =>
      feature?.properties[field]?.toLowerCase()?.includes(query)
    )
  })
})
</script>

<template>
  <div class="objects-page p-5">
    <ui-input v-model="filterText" />
    <objects-list :items="filteredFeatures" />
  </div>
</template>

<style lang="scss">
.objects-page {
  display: grid;
  height: 100%;
  align-content: start;
  overflow: hidden;
  gap: 1.5rem;
}
</style>
