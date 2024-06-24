<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    class="pa-4 text-center mx-auto"
  >
    <span class="material-symbols-sharp"> check_circle </span>

    <h2 class="text-h5 mb-6">Portfel stworzony</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">Możesz wybrać go z listy u góry</p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn class="text-none" color="success" rounded variant="flat" width="90" @click="close">
        Zamknij
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
@font-face {
  font-family: 'Material Symbols Sharp';
  font-style: normal;
  font-weight: 100 700;
  src: url(https://fonts.gstatic.com/s/materialsymbolssharp/v118/gNMVW2J8Roq16WD5tFNRaeLQk6-SHQ_R00k4aWE.woff2)
    format('woff2');
}

.material-symbols-sharp {
  font-family: 'Material Symbols Sharp';
  font-weight: normal;
  font-style: normal;
  font-size: 144px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  color: #53b257;
}
</style>
