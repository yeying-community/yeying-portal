import '@/assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import lang from '@/lang'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//国际化
const key = 'en'
app.config.globalProperties.$t = lang[key]

app.mount('#app')
