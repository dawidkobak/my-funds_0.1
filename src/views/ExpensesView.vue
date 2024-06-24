<template>
  <MainNav />
  <div class="ml-120">
    <WalletsContainer
      label="Wydatek"
      type="Expenses"
      v-model="currentWallet"
      newWalletCaption="Stwórz nową listę wydatków"
    >
      <div class="">
        <WalletMonthlyOutcomSummary :initial-data="currentWallet" />
      </div>
    </WalletsContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import MainNav from '../components/navigation/MainNav.vue'
import WalletsContainer from '../components/wallet/WalletsContainer.vue'
import WalletMonthlyOutcomSummary from '../components/wallet/WalletMonthlyOutcomSummary.vue'
import { useWalletsStore } from '../stores/walletsStore'

const walletsStore = useWalletsStore()
const expensessWallets = ref(walletsStore.getExpensesWallets)
const lastOpened = ref(walletsStore.getLastOpened('Expenses'))

const currentWallet = ref(
  expensessWallets.value.find((el) => el.id === lastOpened.value) ?? {
    id: 'Wydatki demo',
    type: 'Expenses',
    data: [
      {
        id: '3aa9dfe1-b594-4c8f-b414-2d01628c8f01',
        caption: '',
        amount: 2570.0,
        subAmounts: [
          {
            id: 'b131f9c5-6351-4462-ae97-6b574bdf2001',
            text: 'czynsz najmu',
            value: 1800.0
          },
          {
            id: 'a0ee2092-46f6-4fcd-a79f-3a6e177de002',
            text: 'czynsz administracyjny',
            value: 500.0
          },
          {
            id: 'eb78e93a-fc11-404a-b724-3f31d17003af',
            text: 'internet',
            value: 70.0
          },
          {
            id: '26d4d492-939b-45ce-bed4-abd09768a07d',
            text: 'prąd',
            value: 200.0
          }
        ],
        color: 'rgb(142, 36, 170)',
        text: 'mieszkanie'
      }
    ]
  }
)
</script>
