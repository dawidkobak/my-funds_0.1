<template>
  <main class="w-full items-center">
    <div class="w-full mx-auto">
      <div class="mt-5">
        <v-combobox
          :label="props.label"
          :items="walletIds"
          v-model="currentWalletName"
        ></v-combobox>
      </div>
      <div>
        <WalletCreator :type="props.type" @walletCreated="updateCategories" />
      </div>
      <div v-if="props.type === 'Expenses'" class="text-center mt-10">
        <v-btn color="#342b84" class="text-white mr-3">
          <v-icon start icon="mdi-file-import"></v-icon> Import z pliku CSV
        </v-btn>
        <v-btn color="#342b84" class="text-white">
          <v-icon start icon="mdi-file-export"></v-icon> Eksport do pliku CSV
        </v-btn>
      </div>
      <div class="mt-10">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useWalletsStore } from '../../stores/walletsStore'
import { watch } from 'vue'
import WalletCreator from './WalletCreator.vue'

const props = defineProps({
  label: {
    type: String,
    requied: true
  },
  type: {
    type: String,
    requied: true,
    validator(value) {
      return ['Investing', 'Expenses'].includes(value)
    }
  },
  modelValue: {
    type: Object,
    required: true
  },
  newWalletCaption: {
    type: String,
    requied: false,
    default: 'Create new wallet'
  }
})

const walletsStore = useWalletsStore()

const wallets = ref(walletsStore.getWalletsByType(props.type))
const walletIds = ref(wallets.value.map((wallet) => wallet.id))
const currentWalletName = ref(walletsStore.getLastOpened(props.type))

const emit = defineEmits(['update:modelValue'])

watch(currentWalletName, () => {
  currentWallet.value = walletsStore.getWallet(currentWalletName.value)
  emit('update:modelValue', currentWallet.value)
  walletsStore.setLastOpened(props.type, currentWalletName.value)
})

const currentWallet = ref(walletsStore.getLastOpened(props.type))

const updateCategories = () => {
  wallets.value = walletsStore.getWalletsByType(props.type)
  walletIds.value = wallets.value.map((wallet) => wallet.id)
}
</script>
