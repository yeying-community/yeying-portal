import '@/assets/style.css'
import {t} from '@yeying-community/yeying-i18n'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import identity from '@/plugins/identity.js'
import account from '@/plugins/account.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(identity, {})
app.use(account, {})

app.config.globalProperties.$t = t

console.log(t('portal.aboutUs'), t('portal.AppStore'))

app.mount('#app')
