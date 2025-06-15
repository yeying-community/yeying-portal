import '@/assets/style.css'
// import {t} from '@yeying-community/yeying-i18n'
// import '@yeying-community/yeying-wallet/dist/yeying-wallet.css';
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from '@/App.vue'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'
// import {createWallet,sdkRoutes} from '@yeying-community/yeying-wallet';
// import $account from '@/plugins/account2'

const app = createApp(App)

app.use(createPinia())

// app.config.globalProperties.$t = t

// 合并路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes]
})
// 需要登录就需要添加这个路由守卫,如果是不是公开路由，并且没有登录，跳转到登录页面
// sdkSetupRouter(router) // sdk路由守卫
// setupRouter(router) // 项目路由守卫
// const isLogin = $account.isLogin()
// console.log('isLogin',isLogin)
app.use(router)
// sdk初始化调用
// createWallet(router,initializeProviders,{
//   // 登录成功回调
//   onLoginSuccess: (account) => {
//     console.log('登录成功',account);
//   },
//   // 创建身份成功回调
//   onCreateSuccess: () => {
//     console.log('注册成功');
//   }
// })
app.mount('#app')
