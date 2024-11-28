import '@/assets/style.css'
import {t} from '@yeying-community/yeying-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
// import lang from '@/lang'

const app = createApp(App)

// const identityManager = new YeYing.IdentityManager()
// const accountManager = new YeYing.AccountManager()
app.use(createPinia())
app.use(router)
//国际化
// const key = identityManager?.localCache?.instance?.i18nextLng||'en-US'
// console.log('lang',key)
// app.config.globalProperties.$t = lang[key.replace("-","")]
app.config.globalProperties.$t = t
// window.$t = t

console.log(t("portal.aboutUs"),t("portal.testMs"))

app.mount('#app')
