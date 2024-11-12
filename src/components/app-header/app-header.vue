<script setup>
import { navItems } from './config'
</script>

<template>
  <header class="app-header z-1">
    <ui-menubar
      :model="navItems"
      class="menu"
    >
      <template #item="{ item, props }">
        <router-link
          :to="item.path"
          class="flex align-items-center"
          v-bind="props.action"
        >
          <span
            :class="item.icon"
            class="p-menuitem-icon"
          />
          <span>{{ item.label }}</span>
        </router-link>
      </template>
    </ui-menubar>
  </header>
</template>
