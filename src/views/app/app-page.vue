<script setup>
import { useObjectsStore } from '@/stores'
import { defineAsyncComponent as DAC, ref, onMounted } from 'vue'

const objectsStore = useObjectsStore()
const appHeader = DAC(() => import('~/app-header/app-header.vue'))
const loading = ref(true)

onMounted(async () => {
  try {
    loading.value = true
    await objectsStore.getObjects()
  } catch (e) {
    throw e
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="app">
    <app-header />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss">
.app {
  display: grid;
  height: 100%;
  width: 100%;
  overflow: hidden;
  align-content: flex-start;
  grid-template-rows: auto 1fr;
}
</style>
