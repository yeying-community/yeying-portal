import IndexView from '@/views/IndexView.vue'
import { initializeProviders } from '@/plugins/account'

export const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/HomeView.vue')
            },
            {
                path: '/solution',
                name: 'solution',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/SolutionView.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/market',
        name: 'market',
        component: () => import('../views/apply/MarketView.vue'),
        children: [
            {
                path: '',
                name: 'apply',
                component: () => import('../views/apply/ApplyView.vue')
            },
            {
                path: 'apply-edit',
                name: 'applyEdit',
                component: () => import('../views/apply/ApplyEdit.vue')
            },
            {
                path: 'apply-detail',
                name: 'applyDetail',
                component: () => import('../views/apply/ApplyDetail.vue')
            },
            {
                path: 'service',
                name: 'service',
                component: () => import('../views/apply/ServiceView.vue')
            },
            {
                path: 'service-edit',
                name: 'serviceEdit',
                component: () => import('../views/apply/ServiceEdit.vue')
            },
            {
                path: 'service-detail',
                name: 'serviceDetail',
                component: () => import('../views/apply/ServiceDetail.vue')
            },
            {
                path: 'approval',
                name: 'approval',
                component: () => import('../views/apply/ApprovalView.vue')
            }
        ]
    }
]
export const setupRouter = (router) => {
    router.beforeEach(async (to, from, next) => {
        if (!to.meta.public) {
            await initializeProviders()
            next()
        } else {
            next()
        }
    })
}
