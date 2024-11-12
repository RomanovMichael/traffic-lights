<script setup>
import { defineAsyncComponent as DAC } from 'vue'

const HomeMap = DAC(() => import('./components/home-map/home-map.vue'))
</script>

<template>
  <div class="home-page p-5">
    <home-map />
  </div>
</template>
