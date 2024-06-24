import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useWalletsStore = defineStore('wallets', () => {
  const wallets = ref(JSON.parse(localStorage.getItem('wallets')) ?? [])
  const walletLastOpened = ref(JSON.parse(localStorage.getItem('walletLastOpened')) ?? {})

  function setLocalStorage() {
    localStorage.setItem('wallets', JSON.stringify(wallets.value))
  }

  function getWallet(id) {
    return wallets.value.find((w) => w.id === id)
  }

  function getWalletsByType(type) {
    return wallets.value.filter((wallet) => wallet.type == type)
  }

  const getExpensesWallets = computed(() => {
    return wallets.value.filter((wallet) => wallet.type == 'Expenses')
  })

  const getInvestsmentsWallets = computed(() => {
    return wallets.value.filter((wallet) => wallet.type == 'Investing')
  })

  function createWallet(id, type) {
    wallets.value.push({
      id,
      type,
      data: []
    })
    setLocalStorage()
  }

  function getLastOpened(type) {
    return walletLastOpened.value[type]
  }

  function setLastOpened(type, walletName) {
    walletLastOpened.value[type] = walletName
    localStorage.setItem('walletLastOpened', JSON.stringify(walletLastOpened.value))
  }

  return {
    wallets,
    setLocalStorage,
    getWallet,
    getExpensesWallets,
    getInvestsmentsWallets,
    getWalletsByType,
    createWallet,
    getLastOpened,
    setLastOpened
  }
})
