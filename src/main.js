import '@/assets/style.css'
import {t} from '@yeying-community/yeying-i18n'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import account from '@/plugins/account.js'
// import lang from '@/lang'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(account, {})

app.config.globalProperties.$t = t

console.log(t('portal.aboutUs'), t('portal.AppStore'))

app.mount('#app')
