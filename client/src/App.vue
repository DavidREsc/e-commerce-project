<script>
import NavBar from './components/NavBar.vue'
import AddedToCartVue from './components/AddedToCart.vue';
import { store } from './utils';
export default {
    data() {
        return {
            store
        }
    },
    components: {NavBar, AddedToCartVue}
}
</script>


<template>
    <div v-if="!store.loading" className="content">   
        <NavBar />
        <AddedToCartVue />
        <div>
            <router-view v-slot="{Component}" >
                <transition name="slide" mode="out-in">
                    <component :is="Component" :key="$route.path"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="css">
    .slide-enter-active,
    .slide-leave-active {
        transition: opacity 0.2s, transform 0.2s;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
    }

    .slide-enter-from {
        transform: translateY(0%)
    }
    .slide-leave-to {
        transform: translateY(0%)
    }
</style>


