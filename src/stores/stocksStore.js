import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStocksStore = defineStore('stocks', () => {
  const stocksNames = ref(
    [
      'Bitcoin',
      'EMIM',
      'XFVT',
      'SWIG 80',
      'WIG 20',
      'MWIG 40',
      'BNB',
      'SGLN',
      'Amazon',
      'Tesla',
      'S&P 500',
      'NASDAQ',
      'Nvidia',
      'MSCI World',
      'DAX',
      'IXIC',
      'DJI',
      'VIX',
      'UKX',
      'TSX',
      'RUI',
      'Comarch',
      'CD Projekt',
      'LPP',
      'KGHM',
      'Allegro',
      'Asseco',
      'Dino Polska',
      'PZU',
      'Orange PL',
      'PGE',
      'PKN Orlen',
      'Pepco Group',
      'Cyfrowy Polsat',
      'Alior Bank',
      'Pekao',
      'mBank'
    ].sort()
  )

  return {
    stocksNames
  }
})
