<script>
import axios from 'axios'
import { activateDropDown } from '../store'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import LoadingSpinnerSm from '../components/LoadingSpinnerSm.vue'
export default {
    data () {
        return {
            products: null,
            clicked: false,
            loading: true
        }
    },
    components: {LoadingSpinner},
    props: ['category'],
    methods: {
        async initData() {
            const response = await axios.get(`/api/v1/products?categories=${this.category}`)
            this.products = response.data
            const images = response.data.data.map(data => {
                return new Promise((resolve, reject) => {
                    const img  = new Image()
                    img.src = data.image
                    img.onload = resolve
                    img.onerror = reject
                })
            })
            Promise.all(images).then(() => this.loading = false)
                .catch((e) => console.log(e))
        },
        async addToCart(productId, productImage, productTitle) {
            this.clicked = true
            try {
                const response = await axios.put(`/api/v1/carts/${productId}`, {
                    method: 'PUT',
                    quantity: 1
                })
                setTimeout(() => {
                    this.clicked = false
                    activateDropDown(productImage, productTitle)
                }, 1000)
            } catch(e) {
                const code = e.response.status
                if (code === 401) this.$router.push({name: 'cart'})
            }
        }
    },
    created() {
        this.initData()
    }

}
</script>

<template>
    <div>
        <div class="view-container">
            <div v-if="!loading" class="products-container">
                <div v-for="product in products.data" class="product-container">
                    <router-link :to="{name: 'product', params: {id: product._id}}"><img v-bind:src="product.image" class="product-img-sm"/></router-link>
                    <router-link :to="{name: 'product', params: {id: product._id}}" class="product-title">{{product.title}}</router-link>
                    <p class="product-price">{{'$' + product.price}}</p>
                    <button :class="clicked ? 'add-to-cart-btn active' : 'add-to-cart-btn'" @click="this.addToCart(product._id, product.image, product.title)">
                        Add to Cart
                    </button>
                </div>
            </div>
            <LoadingSpinner v-if="loading"/>
        </div>
    </div>
</template>