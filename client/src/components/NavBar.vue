<template>
    <header>
        <div class="title">
            <router-link class='title' @click="this.closeMenu" :to="{name: 'home'}">Departlux</router-link>
            <router-link title='Cart' class="cart" @click="this.closeMenu" :to="{name: 'cart'}">
                <v-icon name="fa-shopping-cart" scale="1.5" />
            </router-link>
            <router-link  @click="this.closeMenu" :class="store.user ? 'nav-btn-login' : 'nav-btn-login active'" :to="{name: 'login'}">
                    Login
            </router-link>
        </div>
        <div class="nav">
            <div :class="active ? 'nav-links active' : 'nav-links'">
                <router-link @click="this.closeMenu" class="nav-btn" :to="{name: 'products', params: {category: 'electronics'}}" >
                    Electronics
                </router-link>
                <router-link  @click="this.closeMenu" class="nav-btn" :to="{name: 'products', params: {category: 'jewelery'}}">
                    Jewelery
                </router-link>
                <router-link  @click="this.closeMenu" class="nav-btn" :to="{name: 'products', params: {category: 'men\'s clothing'}}">
                    Men's Clothing
                </router-link>
                <router-link  @click="this.closeMenu" class="nav-btn" :to="{name: 'products', params: {category: 'women\'s clothing'}}">
                    Women's Clothing
                </router-link>
                <router-link :to="{name: 'cart'}" class="nav-btn">
                    Cart
                </router-link>
            </div>
        </div>
        <button class='nav-icon' @click="this.activate">
            <v-icon name="fa-bars" />
        </button>
        

    </header>
</template>

<script>
import { store } from '../store'
export default {
    data () {
        return {
            active: false,
            store
        }
    },
    methods: {
        activate() {
            console.log('activate')
            this.active = !this.active
        },
        closeMenu() {
            this.active = false
        }
    }
}
</script>