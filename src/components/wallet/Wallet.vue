<template>
  <div class="w-full min-h-min">
    <div class="grid grid-cols-2">
      <div class="w-full">
        <div class="">
          <div class="">
            <div class="grid grid-cols-2 text-3xl">
              <div class="text-left">Suma {{ walletTypeCaption }} wynosi:</div>
              <div class="text-right mr-5">{{ userStore.formatter.format(total) }}</div>
            </div>
          </div>
          <div class="my-4">
            <div class="grid grid-cols-1">
              <div class="w-full">
                <div class="text-4xl text-center">{{ props.walletName }}</div>
              </div>
            </div>
          </div>

          <div v-for="asset in currentAssets" :key="asset.caption" class="mt-3">
            <WalletAsset
              :id="asset.id"
              :amount="asset.amount"
              :color="asset.color"
              :text="asset.text"
              :total="total"
              :with-sub-amounts="props.withSubAmounts"
              :subAmounts="asset.subAmounts"
              @caption-updated="(e) => changeAssetCaption(asset.id, e)"
              @amount-updated="(e) => changeAssetAmount(asset.id, e)"
              @color-updated="(e) => changeAssetColor(asset.id, e)"
              @text-updated="(e) => textUpdated(asset.id, e)"
              @subAmountsUpdated="(subAmounts) => subAmoumtUpdated(asset.id, subAmounts)"
              @assetDeleted="deleteAsset(asset.id)"
              :key="asset.id"
            />
          </div>

          <div class="mt-4 ml-1 hover:cursor-pointer max-w-min" @click="addAsset">
            <v-btn color="#342b84" class="text-white" v-bind="props">
              {{ addAnotherAssetCaption }}
            </v-btn>
          </div>
        </div>
      </div>

      <div class="mt-10 w-11/12">
        <WalletChart :chart-data="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toValue, watch } from 'vue'

import WalletChart from './WalletChart.vue'
import WalletAsset from '../wallet/WalletAsset.vue'

import { useWalletsStore } from '../../stores/walletsStore'
import { useUserStore } from '../../stores/userStore'
const walletStore = useWalletsStore()
const userStore = useUserStore()

const currentAssets = ref(toValue(props.initialData))

const total = computed(() =>
  currentAssets.value.map((asset) => parseFloat(asset.amount)).reduce((x, y) => x + y, 0.0)
)

const walletTypeCaption = computed(() => {
  if (props.type === 'Expenses') {
    return 'wydatków'
  }
  return 'portfela'
})

watch(props, () => {
  currentAssets.value = toValue(props.initialData)
})

const props = defineProps({
  walletName: {
    type: String,
    required: false,
    default: ''
  },
  initialData: {
    type: Array,
    required: false,
    default: new Array()
  },
  withSubAmounts: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: 'Investing'
  },
  addAnotherAssetCaption: {
    type: String,
    required: false,
    default: 'Add another wallet asset'
  }
})

const chartData = computed(() => {
  return {
    labels: currentAssets.value.map((asset) => asset.text),
    datasets: [
      {
        backgroundColor: currentAssets.value.map((asset) => asset.color),
        data: currentAssets.value.map((asset) => asset.amount)
      }
    ]
  }
})

const changeAssetCaption = (assetId, caption) => {
  const asset = currentAssets.value.find((a) => a.id === assetId)
  if (asset) {
    asset.caption = caption
    emit('assetCaptionChanged', { assetId, caption })
    walletStore.setLocalStorage()
  }
}

const changeAssetAmount = (assetId, amount) => {
  const asset = currentAssets.value.find((a) => a.id === assetId)
  if (asset) {
    asset.amount = parseFloat(amount)
    emit('assetValueChanged', { assetId, amount })
    walletStore.setLocalStorage()
  }
}

const changeAssetColor = (assetId, color) => {
  const asset = currentAssets.value.find((a) => a.id === assetId)
  if (asset) {
    asset.color = color
    emit('assetColorChanged', { assetId, color })
    walletStore.setLocalStorage()
  }
}

const addAsset = () => {
  currentAssets.value.push({
    id: crypto.randomUUID(),
    caption: '',
    amount: 0.0,
    subAmounts: [],
    color: '#000000'.replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16)
    })
  })
}

const textUpdated = (assetId, newText) => {
  const asset = currentAssets.value.find((a) => a.id === assetId)
  if (asset) {
    asset.text = newText
    emit('assetTextUpdated', assetId, newText)
    walletStore.setLocalStorage()
  }
}

const subAmoumtUpdated = (assetId, subAmounts) => {
  const asset = currentAssets.value.find((a) => a.id === assetId)
  if (asset) {
    asset.subAmounts = subAmounts
    emit('assetSubAmountsUpdated', assetId, subAmounts)
    walletStore.setLocalStorage()
  }
}

const deleteAsset = (assetId) => {
  const assetIndex = currentAssets.value.findIndex((a) => a.id === assetId)
  if (assetIndex >= 0) {
    currentAssets.value.splice(assetIndex, 1)
  }
}

const emit = defineEmits([
  'assetCaptionChanged',
  'assetValueChanged',
  'assetColorChanged',
  'assetTextUpdated',
  'assetSubAmountsUpdated'
])
</script>
