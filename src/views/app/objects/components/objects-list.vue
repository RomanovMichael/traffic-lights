<script setup>
import router from '@/router'
import { useMapStore } from 'STORES'

const mapStore = useMapStore()

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const findOnTheMap = feature => {
  router.push('/home')

  mapStore.setPopup(feature)
}
</script>

<template>
  <div class="objects-list__wrap">
    <div class="objects-list">
      <ui-card
        v-for="item in items"
        :key="item.id"
        class="objects-list__card flex flex-column"
      >
        <template #subtitle>
          <div>
            <i
              class="pi pi-circle-fill mr-1"
              :style="`color:${item.properties.color}`"
            />
            {{ item.properties.status_text }}
          </div>
        </template>
        <template #content>
          <p class="text-xl">
            {{ item.properties.address }}
          </p>
          <p class="text-sm">ip: {{ item.properties.ip }}</p>
          <p class="text-sm">created: {{ item.properties.created }}</p>
          <p class="text-sm">updated: {{ item.properties.updated }}</p>
        </template>
        <template #footer>
          <ui-button
            class="w-full"
            label="Найти на карте"
            icon="pi pi-map-marker"
            icon-pos="right"
            @click="findOnTheMap(item)"
          />
        </template>
      </ui-card>
    </div>
  </div>
</template>

<style lang="scss">
.objects-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  &__wrap {
    overflow-y: scroll;
    height: 100%;
  }

  &__card {
    .p-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between !important;
    }
  }
}
</style>
