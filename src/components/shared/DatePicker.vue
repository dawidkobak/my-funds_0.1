<template>
  <div
    class="my-auto p-1.5 rounded-full bg-gray-400 mr-2 cursor-pointer"
    @click="expanded = !expanded"
  >
    <div class="relative">
      <img src="/calendar.png" />
      <p :class="dayOfMonthStyles">{{ dayOfMonth }}</p>
    </div>
  </div>
  <div v-if="expanded">
    <v-locale-provider locale="pl">
      <v-date-picker
        v-model="date"
        class="absolute z-10"
        cancel-text="Anuluj"
        header="Wybierz datę"
        ok-text="Wybierz"
        title="Wybierz datę"
        color="#8074e4"
      >
      </v-date-picker>
    </v-locale-provider>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const date = ref()
const expanded = ref(false)

const dayOfMonth = computed(() => {
  if (date.value && date.value[0] != undefined) {
    return date.value[0].getDate()
  }
  return 1
})

const dayOfMonthStyles = computed(() => {
  if (dayOfMonth.value < 10) {
    return 'dayMonthOneDigit'
  }
  return 'dayMonthTwoDigits'
})
</script>

<style scoped>
.dayMonthTwoDigits {
  position: absolute;
  top: 1rem;
  left: 0.8rem;
}

.dayMonthOneDigit {
  position: absolute;
  top: 1rem;
  left: 1.1rem;
}
</style>
