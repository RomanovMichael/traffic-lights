<script setup>
const props = defineProps({
  feature: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="map-balloon p-card p-3 fadein w-20rem">
    <div>
      <i
        class="pi pi-circle-fill mr-1"
        :style="`color:${feature.properties.color}`"
      />
      {{ feature.properties.status_text }}
    </div>
    <h3 class="text-base" />
    <p class="text-sm">id: {{ feature.properties.id }}</p>
    <p class="text-sm">Cлой: {{ feature.layer.id }}</p>
    <p class="text-sm">{{ feature.properties.address }}</p>
  </div>
</template>

<style scoped>
.map-balloon {
  position: absolute;
}
</style>
