<template>
  <div class="">
    <Doughnut ref="chart" :data="props.chartData" :plugins="myPlugin" :options="config" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const myPlugin = [
  {
    id: 'textCenter',
    afterTooltipDraw(chart, args) {
      const { ctx } = chart
      const elementIndex = props.chartData.labels.findIndex((el) => el === args.tooltip.title[0])
      const elementValue = props.chartData.datasets[0].data[elementIndex]
      const total = props.chartData.datasets[0].data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0.0
      )
      const percent = ((100 * elementValue) / total).toFixed(2) + ' %'
      ctx.textAlign = 'center'
      ctx.font = '36px "Helvetica Neue", Helvetica, Arial, sans-serif'
      ctx.fillText(percent, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
    }
  }
]

const chart = ref(null)

const config = {
  radius: '75%'
}

const props = defineProps(['chartData'])
</script>
