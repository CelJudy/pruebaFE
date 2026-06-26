import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/middlewares/auth'
import {admin} from '@/middlewares/admin'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { layout: 'menu' },
            beforeEnter:(to, from, next)=>{auth(next)},
            component: () => import('@/views/IndexView.vue'),
        },
        {
            path: '/users',
            name: 'users',
            meta: { layout: 'menu' },
            beforeEnter:(to, from, next)=>{admin(next)},
            component: () => import('@/views/CRUDView.vue'),
        },
        {
            path: '/login', 
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/:pathMatch(.*)*', 
            name: 'error',
            component: () => import('@/views/ErrorView.vue'),
        }
    ],
})

export default router
