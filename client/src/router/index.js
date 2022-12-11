import {createRouter, createWebHistory} from 'vue-router'
import { store, getMe } from '../store.js'

const routes = [
    {path: '/products/:category', name: 'products', component: () => import('../views/Products.vue'), props: true},
    {path: '/products/:category/:id', name: 'product', component: () => import('../views/Product.vue'), props: true},
    {path: '/cart', name: 'cart', component: () => import('../views/Cart.vue'), 
        beforeEnter() {
            if (!store.user) {return {name: 'login'}
        }        
    }},
    {path: '/orders', name: 'orders', component: () => import('../views/Orders.vue')},
    {path: '/register', name: 'register', component: () => import('../views/Register.vue')},
    {path: '/login', name: 'login', component: () => import('../views/Login.vue')},
    {path: '/', name: 'home', component: () => import('../views/Home.vue')},
    {path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../views/NotFound.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    }
})

router.beforeEach(async () => {
    if (store.loading) {
        await getMe()
        console.log('loading')
    }
})

export default router
