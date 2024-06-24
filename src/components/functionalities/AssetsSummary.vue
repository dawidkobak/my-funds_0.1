<template>
  <div>
    <div class="w-full flex text-4xl">
      <div class="w-3/4">Suma wszystkich inwestycji wynosi:</div>
      <div class="w-1/4 text-right mr-4">{{ userStore.formatter.format(props.total) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/userStore'
const userStore = useUserStore()

const props = defineProps({
  total: {
    type: Number,
    required: false,
    default: 0.0
  }
})
</script>
