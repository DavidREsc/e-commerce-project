<script>
import axios from 'axios'
import { activateDropDown } from '../store'
export default {
    data () {
        return {
            products: null,
            dropdown: {
                active: false,
                image: null,
                title: null
            }
        }
    },
    props: ['category'],
    methods: {
        async initData() {
            const response = await axios.get(`/api/v1/products?categories=${this.category}`)
            this.products = response.data
            console.log(response.data)
        },
        async addToCart(productId, productImage, productTitle) {
            console.log(productId)
            const response = await axios.put(`/api/v1/carts/${productId}`, {
                method: 'PUT',
                quantity: 1
            })
            console.log(response)
            activateDropDown(productImage, productTitle)
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
                    <button class='add-to-cart-btn' @click="this.addToCart(product._id, product.image, product.title)">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>