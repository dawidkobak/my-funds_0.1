<template>
  <MainNav />
  <div class="ml-120">
    <div class="mx-auto">
      <h1 class="text-5xl pt-5 text-center">Ustawienia konta</h1>
      <v-combobox
        label="Waluta"
        :items="currencies"
        v-model="currentCurrency"
        class="mt-5"
      ></v-combobox>
      <div class="mt-5 text-center">
        <v-btn color="#342b84" class="text-white" size="x-large"> Zapisz </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNav from '../components/navigation/MainNav.vue'

const currencies = [
  'PLN - Polski złoty',
  'USD - Dolar amerykański',
  'EUR - Euro',
  'GBP - Funt szterling',
  'CHF - Frank szwajcarski'
]
const currentCurrency = ref('PLN - Polski złoty')
</script>
