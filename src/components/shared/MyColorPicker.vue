<template>
  <div>
    <Vue3ColorPicker :pureColor="currentColor" @pure-color-change="setCurrentColor" />
  </div>
</template>

<script setup>
import { ref, toValue, watch } from 'vue'

const currentColor = ref(toValue(props.pureColor))

const setCurrentColor = (rbgStr) => {
  const colorRegexp = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
  const match = colorRegexp.exec(rbgStr)
  if (match !== null) {
    currentColor.value = {
      r: match[1],
      g: match[2],
      b: match[3]
    }
  }
}

const props = defineProps({
  pureColor: {
    type: String,
    required: false,
    default: 'rgb(0, 0, 0)'
  }
})

watch(currentColor, () => {
  const rgbStr = `rgb(${currentColor.value.r}, ${currentColor.value.g}, ${currentColor.value.b})`
  emit('colorUpdated', rgbStr)
})

const emit = defineEmits(['colorUpdated'])
</script>

<style scoped>
@import 'vue3-colorpicker/style.css';
</style>
