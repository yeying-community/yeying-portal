import '@/assets/style.css'

import {t, setLanguage} from '@yeying-community/yeying-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import lang from '@/lang'

const app = createApp(App)
setLanguage('zh-CN').then(() => {
  console.log(t('common.confirm'))
  setLanguage('en-US').then(() => {
    console.log(t('common.confirm'))
  })
})

const identityManager = new YeYing.IdentityManager()
const accountManager = new YeYing.AccountManager()

app.use(createPinia())
app.use(router)
//国际化
const key = 'en'
app.config.globalProperties.$t = lang[key]
app.config.globalProperties.$_t = t

app.mount('#app')
