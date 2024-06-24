<template>
  <MainNav />
  <div class="ml-120">
    <div class="text-center">
      <h1 class="text-5xl mt-5">Transakcje inwestycyjne</h1>
    </div>
    <div class="mt-10">
      <v-row v-for="tranaction in transactions" :key="tranaction.id">
        <DatePicker />
        <v-checkbox
          v-model="tranaction.isAssetListed"
          label="Aktywo notowane?"
          color="indigo-darken-3"
          hide-details
        ></v-checkbox>
        <v-text-field
          v-if="tranaction.isAssetListed"
          v-model="tranaction.amount"
          label="Ilość aktywa"
          class="bg-white"
        />
        <v-text-field
          v-if="tranaction.isAssetListed"
          v-model="tranaction.price"
          label="Cena zakupu"
          class="bg-white"
        />
        <v-combobox
          v-if="tranaction.isAssetListed"
          label="Aktywo"
          :items="stockNames"
          v-model="tranaction.stockName"
        ></v-combobox>
        <v-text-field
          v-if="!tranaction.isAssetListed"
          v-model="tranaction.name"
          label="Nazwa aktywa"
          class="bg-white"
        />
        <v-text-field
          v-if="!tranaction.isAssetListed"
          v-model="tranaction.value"
          label="Wartość aktywa"
          class="bg-white"
        />
        <v-combobox
          label="Portfel"
          :items="investingWalletNames"
          v-model="tranaction.walletName"
        ></v-combobox>
      </v-row>

      <div class="my-10">
        <v-btn color="#342b84" class="text-white" @click="addTransaction">
          Dodaj kolejną transakcję
        </v-btn>
      </div>

      <div class="mt-5 text-center">
        <v-btn color="#342b84" class="text-white" size="x-large"> Zapisz </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MainNav from '../components/navigation/MainNav.vue'
import DatePicker from '../components/shared/DatePicker.vue'
import { useStocksStore } from '../stores/stocksStore'
import { useWalletsStore } from '../stores/walletsStore'

const stocksStore = useStocksStore()
const walletsStore = useWalletsStore()

const stockNames = stocksStore.stocksNames
const investingWalletNames = computed(() =>
  walletsStore.getInvestsmentsWallets.map((wallet) => wallet.id)
)

const transactions = ref([
  {
    id: crypto.randomUUID(),
    date: new Date(),
    isAssetListed: true,
    amount: 0.0,
    price: 0.0,
    stockName: '',
    walletName: '',
    name: '',
    value: 0.0
  }
])

const addTransaction = () => {
  transactions.value.push({
    id: crypto.randomUUID(),
    date: new Date(),
    isAssetListed: true,
    amount: 0.0,
    price: 0.0,
    stockName: '',
    walletName: '',
    name: '',
    value: 0.0
  })
}
</script>
