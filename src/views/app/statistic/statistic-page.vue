<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStatisticStore } from 'STORES'
import { chartTypes } from './config'
import { debounce } from 'UTILS'

const chartType = ref('doughnut')
const chartData = ref(null)
const chartOptions = ref(null)
const chartInstance = ref(null)

const stats = computed(() => useStatisticStore().statistic)

const setChartData = () => ({
  labels: stats.value.map(s => s.label),
  datasets: [
    {
      label: 'Светофоры',
      data: stats.value.map(s => s.count),
      backgroundColor: stats.value.map(s => s.color)
    }
  ]
})

const setChartOptions = () => ({
  plugins: {
    legend: {
      labels: {
        color: '#494A52'
      }
    }
  }
})

const initChart = debounce(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
}, 100)

watch(
  () => chartType.value,
  () => {
    chartInstance.value.reinit()

    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  }
)

onMounted(async () => {
  await initChart()
})
</script>

<template>
  <div class="statistic-page flex gap-3 p-5">
    <ui-card class="col-3">
      <template #title>
        <h1 class="text-4xl">Cтатистика</h1>
      </template>
      <template #content>
        <div class="flex flex-column">
          <div
            v-for="status in stats"
            :key="status.id"
            class="flex justify-content-between border-bottom-1 border-300 py-3 px-2"
          >
            <div>
              <i
                class="pi pi-circle-fill mr-3"
                :style="`color:${status.color}`"
              />{{ status.label }}
            </div>
            <div>{{ status.count }}</div>
          </div>
        </div>
      </template>
    </ui-card>
    <ui-card class="col">
      <template #content>
        <div class="flex flex-column gap-5">
          <div class="grid justify-content-end p-2">
            <ui-select-button
              :options="chartTypes"
              :option-value="'id'"
              v-model="chartType"
              >
              <template #option="slotProps">
                <i :class="slotProps.option.icon"/>
              </template>
            </ui-select-button>
          </div>

          <div class="grid justify-content-center">
            <ui-chart
              ref="chartInstance"
              :type="chartType"
              :data="chartData"
              :options="chartOptions"
              class="w-full md:w-30rem"
            />
          </div>
        </div>
      </template>
    </ui-card>
  </div>
</template>
