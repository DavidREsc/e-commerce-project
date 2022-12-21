import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {FaBars, FaShoppingCart, CoDelete, IoCheckmarkDoneCircleSharp} from 'oh-vue-icons/icons'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

addIcons(FaBars, FaShoppingCart, CoDelete, IoCheckmarkDoneCircleSharp)

const app = createApp(App)
app.component("v-icon", OhVueIcon)
app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')


