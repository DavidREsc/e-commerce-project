import {createRouter, createWebHistory} from 'vue-router'
import { store, getMe, getPaymentSession } from '../store.js'

const routes = [
    {path: '/products/:category', name: 'products', component: () => import('../views/Products.vue'), props: true},
    {path: '/products/:category/:id', name: 'product', component: () => import('../views/Product.vue'), props: true},
    {path: '/cart', name: 'cart', component: () => import('../views/Cart.vue'), 
        beforeEnter(to, from) {
            store.toRoute = to
            if (!store.user) {return {name: 'login'}}        
    }},
    {path: '/orders', name: 'orders', component: () => import('../views/Orders.vue')},
    {path: '/register', name: 'register', component: () => import('../views/Register.vue')},
    {path: '/login', name: 'login', component: () => import('../views/Login.vue'),
        beforeEnter() {
            if (store.user) {return {name: 'home'}}
        }
    },
    {path: '/', name: 'home', component: () => import('../views/Home.vue')},
    {path: '/order/success/:session_id', name: 'order_success', component: () => import('../views/OrderSuccess.vue'),
        async beforeEnter(to) {
            const session = await getPaymentSession(to.params.session_id)
            if (!session) {return {name: 'home'}}
        }
    },
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
