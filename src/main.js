import './assets/style.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VDatePicker } from 'vuetify/labs/VDatePicker'
import pl from 'date-fns/locale/pl/index'
import DateFnsAdapter from '@date-io/date-fns'

const vuetify = createVuetify({
  components: {
    ...components,
    VDatePicker
  },
  directives,
  locale: {
    messages: { pl }
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      pl: pl
    }
  }
})

import App from './App.vue'
import router from './router'

import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3ColorPicker)
app.use(vuetify)

app.mount('#app')
