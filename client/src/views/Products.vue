<script>
import axios from 'axios'
import { activateDropDown } from '../store'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import LoadingSpinnerSm from '../components/LoadingSpinnerSm.vue'
export default {
    data () {
        return {
            products: null,
            clicked: false
        }
    },
    components: {LoadingSpinner},
    props: ['category'],
    methods: {
        async initData() {
            const response = await axios.get(`/api/v1/products?categories=${this.category}`)
            this.products = response.data
            console.log(response.data)
        },
        async addToCart(productId, productImage, productTitle) {
            this.clicked = true
            const response = await axios.put(`/api/v1/carts/${productId}`, {
                method: 'PUT',
                quantity: 1
            })
            setTimeout(() => {
                this.clicked = false
                activateDropDown(productImage, productTitle)
            }, 1000)
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
            <div v-if="products" class="products-container">
                <div v-for="product in products.data" class="product-container">
                    <img v-bind:src="product.image" class="product-img-sm"/>
                    <router-link :to="{name: 'product', params: {id: product._id}}" class="product-title">{{product.title}}</router-link>
                    <p class="product-price">{{'$' + product.price}}</p>
                    <button :class="clicked ? 'add-to-cart-btn active' : 'add-to-cart-btn'" @click="this.addToCart(product._id, product.image, product.title)">
                        Add to Cart
                    </button>
                </div>
            </div>
            <LoadingSpinner v-if="!products"/>
        </div>
    </div>
</template>