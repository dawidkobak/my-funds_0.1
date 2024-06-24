import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Authentication } from '../auth/authentication'

export const useUserStore = defineStore('user', () => {
  const userPoolId = ref('eu-central-1_Bmpfk60bA')
  const identityId = ref('eu-central-1:d4fe8be5-7bea-4fcd-891e-d18ee8c18b26')
  const clientId = ref('7ipthitfu30sk06t4m12l76j5a')
  const region = ref('eu-central-1')
  const authentication = new Authentication(
    userPoolId.value,
    identityId.value,
    clientId.value,
    region.value
  )

  const locale = ref('pl-PL')
  const currency = ref('PLN')

  const formatter = new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: currency.value
  })

  return {
    authentication,
    formatter
  }
})
