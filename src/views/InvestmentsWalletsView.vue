<template>
  <MainNav />
  <div class="ml-120">
    <WalletsContainer
      label="Inwestycje"
      type="Investing"
      v-model="currentWallet"
      newWalletCaption="Stwórz nowy portfel"
    >
      <div class="my-5">
        <AssetsSummary :funds-data="fundsData" :total="total" />
      </div>

      <div class="flex">
        <v-responsive class="" max-width="200">
          <v-text-field
            v-model="date"
            label="Data notowania"
            :rules="[rules.date]"
            placehodler="dd/mm/yyyy"
            class="bg-white w-fit-content"
          />
        </v-responsive>
        <v-btn color="#342b84" class="text-white delete-sub-amount my-auto ml-10"> Zastosuj </v-btn>
      </div>

      <div class="mt-10">
        <Wallet
          :wallet-name="currentWallet.id"
          :initial-data="currentWallet.data"
          addAnotherAssetCaption="Dodaj kolejne aktywo"
          @asset-caption-changed="(e) => changeAssetCaption(currentWallet.data, e)"
          @asset-amount-changed="(e) => changeAssetAmount(currentWallet.data, e)"
          @asset-color-changed="(e) => changeAssetColor(currentWallet.data, e)"
          @asset-text-updated="
            (assetId, text) => changeAssetText(currentWallet.data, assetId, text)
          "
        />
      </div>
    </WalletsContainer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import MainNav from '../components/navigation/MainNav.vue'
import Wallet from '../components/wallet/Wallet.vue'
import AssetsSummary from '../components/functionalities/AssetsSummary.vue'
import WalletsContainer from '../components/wallet/WalletsContainer.vue'
import { useWalletsStore } from '../stores/walletsStore'

const walletsStore = useWalletsStore()
const investsmentsWallets = ref(walletsStore.getInvestsmentsWallets)
const lastOpened = ref(walletsStore.getLastOpened('Investing'))

const currentWallet = ref(
  investsmentsWallets.value.find((el) => el.id === lastOpened.value) ?? {
    id: 'Portfel demo',
    type: 'Investing',
    data: [
      {
        id: '82d88c4a-1235-11ef-be56-0242ac100001',
        text: 'Gotówka',
        amount: 1000.0,
        color: 'rgb(73, 190, 37)'
      }
    ]
  }
)

const date = ref(new Date().toLocaleDateString('en-GB'))
const rules = {
  date: (value) => {
    const str = value.toString()
    const pattern =
      /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    return pattern.test(str) || 'Nieprawidłowa data'
  }
}

const fundsData = ref(investsmentsWallets.value.flatMap((wallet) => wallet.data))

const total = computed(() => fundsData.value.map((fund) => fund.amount).reduce((x, y) => x + y, 0))

const changeAssetAmount = (funds, event) => {
  const fund = funds.find((fund) => fund.id === event.assetId)
  if (fund) {
    fund.amount = parseFloat(event.amount)
  }
}

const changeAssetColor = (funds, event) => {
  const fund = funds.find((fund) => fund.id === event.assetId)
  if (fund) {
    fund.color = event.color
  }
}

const changeAssetText = (funds, assetId, text) => {
  const fund = funds.find((fund) => fund.id === assetId)
  if (fund) {
    fund.text = text
  }
}
</script>
