<template>
  <div class="flex w-full">
    <DatePicker v-if="props.withSubAmounts" />

    <div class="w-3/12">
      <v-text-field
        v-model="text"
        label="Nazwa aktywa"
        class="bg-white"
        @update:modelValue="setText"
      />
    </div>

    <div class="w-3/12">
      <v-text-field
        v-model="amount"
        label="Wartość"
        prefix="PLN"
        :rules="[rules.money]"
        class="bg-white"
      />
    </div>

    <div class="w-2/12 ml-3">
      <MyColorPicker :pure-color="currentColor" @colorUpdated="setColor" />
    </div>

    <div v-if="props.withSubAmounts" class="w-1/12 ml-3">
      <v-dialog v-model="confirmDeleteAssetVisible" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="#d81b43" v-bind="props" class="text-white delete-sub-amount">
            <span class="material-symbols-outlined"> delete_forever </span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> Czy na pewno chcesz usunąć wydatek? </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="confirmDeleteAssetVisible = false">
              NIE
            </v-btn>
            <v-btn color="red-darken-1" variant="text" @click="deleteAsset"> TAK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="w-3/12">
      <div v-if="props.withSubAmounts && props.subAmounts.length === 0">
        <v-btn color="#342b84" class="text-white"> Podziel wydatek </v-btn>
      </div>
    </div>
  </div>
  <div v-if="props.withSubAmounts">
    <div class="flex w-full" v-for="(subAmount, index) in subAmounts" :key="index">
      <div class="ml-6 my-auto">
        <DatePicker />
      </div>
      <div class="w-4/12">
        <div class="">
          <v-text-field
            v-model="subAmount.text"
            label="Nazwa podwydatku"
            class="bg-white"
            @update:modelValue="(text) => setSubAmountText(text, index)"
          />
        </div>
      </div>
      <div class="w-3/12">
        <div class="mx-2">
          <v-text-field
            v-model="subAmount.value"
            label="Wartość"
            prefix="PLN"
            :rules="[rules.money]"
            class="bg-white"
            @update:focused="setSubAmount(subAmount.value, index)"
          />
        </div>
      </div>
      <div>
        <v-dialog v-model="confirmDeleteVisible" persistent width="auto">
          <template v-slot:activator="{ props }">
            <v-btn color="#d81b43" v-bind="props" class="text-white delete-sub-amount">
              <span class="material-symbols-outlined"> delete_forever </span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Czy na pewno chcesz usunąć podwydatek? </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="text" @click="confirmDeleteVisible = false">
                NIE
              </v-btn>
              <v-btn color="red-darken-1" variant="text" @click="deleteSubAmount(index)">
                TAK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div v-if="props.subAmounts.length > 0" class="ml-6">
      <v-btn color="#342b84" class="text-white" @click="addSubAmount">
        Dodaj kolejną pozycję
      </v-btn>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import MyColorPicker from '../shared/MyColorPicker.vue'
import DatePicker from '../shared/DatePicker.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: false,
    default: 0.0
  },
  color: {
    type: String,
    required: false,
    default: '#FFFFFF'
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  total: {
    type: Number,
    required: false,
    default: 0.0
  },
  withSubAmounts: {
    type: Boolean,
    required: false,
    default: false
  },
  subAmounts: {
    type: Array,
    required: false,
    default: new Array()
  }
})

const amount = ref(props.amount)
const subAmounts = ref(props.subAmounts)
const color = ref(props.color)
const currentColor = ref(color.value)
const text = ref(props.text)
const confirmDeleteVisible = ref(false)
const confirmDeleteAssetVisible = ref(false)

watch(amount, () => {
  emit('amountUpdated', amount.value)
})

const setColor = (e) => {
  emit('colorUpdated', e)
}

const setText = (e) => {
  emit('textUpdated', e)
}

const addSubAmount = () => {
  subAmounts.value.push({ id: crypto.randomUUID(), text: '', value: 0.0 })
}

const setSubAmount = (value, index) => {
  subAmounts.value[index].value = parseFloat(value)
  emit('subAmountsUpdated', subAmounts.value)
  updateAmount()
}

const setSubAmountText = (text, index) => {
  subAmounts.value[index].text = text
  emit('subAmountsUpdated', subAmounts.value)
}

const updateAmount = () => {
  let sum = 0.0
  subAmounts.value.forEach((subAmount) => {
    sum = sum + subAmount.value
  })
  amount.value = parseFloat(sum.toFixed(2))
  emit('amountUpdated', sum)
}

const emit = defineEmits([
  'captionUpdated',
  'amountUpdated',
  'colorUpdated',
  'textUpdated',
  'subAmountsUpdated',
  'assetDeleted'
])

const rules = {
  money: (value) => {
    const str = value.toString()
    const pattern = /^-?(\d*([.,]\d{1,2})?$)/
    return pattern.test(str.replace(',', '.').toString()) || 'Nieprawidłowa kwota'
  }
}

const deleteSubAmount = (index) => {
  confirmDeleteVisible.value = false
  subAmounts.value.splice(index, 1)
  emit('subAmountsUpdated', subAmounts.value)
  updateAmount()
}

const deleteAsset = () => {
  confirmDeleteAssetVisible.value = false
  emit('assetDeleted')
}
</script>

<style scoped>
@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v122/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2)
    format('woff2');
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 36px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.delete-sub-amount {
  min-width: 20px;
  padding-left: 2px;
  padding-right: 2px;
}
</style>
