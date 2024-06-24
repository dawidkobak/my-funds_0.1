<template>
  <MainNav />
  <div class="ml-120">
    <main class="flex w-full items-center">
      <div class="w-full mx-auto">
        <div class="mt-5">
          <v-combobox
            label="Aktywo"
            :items="assets"
            v-model="currentAsset"
            class="mt-5"
          ></v-combobox>
        </div>
        <div>
          <v-card>
            <v-tabs bg-color="#7e75e0" color="#eeeeee" align-tabs="center" v-model="currentTab">
              <v-tab :class="setTabStyles(0)">7D</v-tab>
              <v-tab :class="setTabStyles(1)">1M</v-tab>
              <v-tab :class="setTabStyles(2)">3M</v-tab>
              <v-tab :class="setTabStyles(3)">6M</v-tab>
              <v-tab :class="setTabStyles(4)">YTD</v-tab>
              <v-tab :class="setTabStyles(5)">1R</v-tab>
              <v-tab :class="setTabStyles(6)">5L</v-tab>
              <v-tab :class="setTabStyles(7)">Maks.</v-tab>
            </v-tabs>
          </v-card>
        </div>
        <div class="mt-10">
          <StockChart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MainNav from '../components/navigation/MainNav.vue'
import StockChart from '../components/charts/StockChart.vue'
import { ref } from 'vue'
import { useStocksStore } from '../stores/stocksStore'

const stocksStore = useStocksStore()

const assets = stocksStore.stocksNames

const currentAsset = ref('Bitcoin')

const currentTab = ref(5)

const setTabStyles = (index) => {
  if (currentTab.value == index) {
    return 'bg-purple-darken-4'
  }
  return ''
}
</script>
