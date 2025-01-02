import '@/assets/style.css'
import {t} from '@yeying-community/yeying-i18n'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/App.vue'
import router from '@/router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$t = t

console.log(t('portal.aboutUs'), t('portal.AppStore'))

app.mount('#app')
