import IndexView from '@/views/IndexView.vue'
import {initializeProviders} from '@/plugins/account';

export const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/solution',
        name: 'solution',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/SolutionView.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/LoginView.vue'),
  // },
  // {
  //   path: '/toLogin',
  //   name: 'toLogin',
  //   component: () => import('../views/ToLoginView.vue'),
  // },
  // {
  //   path: '/reg',
  //   name: 'reg',
  //   component: () => import('../views/RegisterView.vue'),
  // },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: () => import('../views/UserView.vue'),
  // },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    children:[
      {
        path: '',
        name: 'user',
        component: () => import('../views/UserView.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('../views/MessageView.vue'),
      },
    ]
  },
  
]
export const setupRouter = (router) => {
  router.beforeEach(async (to,from,next) => {
    if (!to.meta.public) {
      await initializeProviders()
      next();
    }else{
      next()
    }
  });
}

