import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useObjectsStore } from './objects'
import { statuses } from 'CONFIGS'

export const useStatisticStore = defineStore('statistic', () => {
  const objectsStore = useObjectsStore()

  const statistic = computed(() => {
    return Object.keys(statuses).map(key => {
      const count = objectsStore.objects.filter(
        obj => obj.status_info.id === Number(key)
      ).length

      return {
        ...statuses[key],
        count
      }
    })
  })

  return { statistic }
})
