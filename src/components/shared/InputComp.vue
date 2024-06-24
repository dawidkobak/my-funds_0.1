<template>
  <div>
    <label class="block text-sm font-medium leading-6 text-gray-900">
      {{ props.label }}
      <span v-if="props.required" class="text-red-800">*</span>
    </label>
    <input
      :type="props.type"
      :required="props.required"
      :value="props.value"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      class="block rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      :class="calculatedAdditionalClasses"
      @input="handleInput($event)"
    />
  </div>
</template>

<script setup>
import { toRef, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    required: false
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    required: false,
    type: Boolean,
    default: false
  },
  additionalClasses: {
    required: false,
    type: Object,
    default: new Object()
  },
  widthFull: {
    required: false,
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updatedInput'])

const currentAdditionalClasses = toRef(props.additionalClasses)

const calculatedAdditionalClasses = computed(() => {
  return {
    'w-full': props.widthFull,
    ...currentAdditionalClasses.value
  }
})

function handleInput(e) {
  const target = e.target
  emit('updatedInput', target.value)
}
</script>

<style scoped></style>
