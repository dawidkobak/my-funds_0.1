<template>
  <Wallet
    :wallet-name="props.initialData.id"
    with-sub-amounts
    type="Expenses"
    :initial-data="props.initialData.data"
    addAnotherAssetCaption="Dodaj kolejny wydatek"
    @asset-caption-changed="(e) => changeAssetCaption(currentOutcoms, e)"
    @asset-color-changed="(e) => changeAssetColor(currentOutcoms, e)"
    @assetSubAmountsUpdated="changeAssetSubAmounts"
  />
</template>

<script setup>
import { ref, toValue } from 'vue'
import Wallet from './Wallet.vue'
import { useWalletsStore } from '../../stores/walletsStore'
import { watch } from 'vue'

const walletsStore = useWalletsStore()

const props = defineProps({
  initialData: {
    type: Object,
    required: false,
    defulat: new Object()
  }
})

watch(props.initialData, () => {
  currentOutcoms.value = {
    id: props.walletName,
    data: toValue(props.initialData)
  }
})

const currentOutcoms = ref({
  id: props.walletName,
  data: toValue(props.initialData)
})

const changeAssetSubAmounts = (outcoms) => {
  emit('outcomsChanged', outcoms)
  walletsStore.setLocalStorage()
}

const emit = defineEmits('outcomsChanged')
</script>
