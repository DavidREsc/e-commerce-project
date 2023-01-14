<script>
import axios from 'axios'
import { activateDropDown } from '../utils'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ProductImage from '../components/ProductImage.vue'
export default {
    data () {
        return {
            products: null,
            clicked: false,
            loading: true
        }
    },
    components: {LoadingSpinner, ProductImage},
    props: ['category'],
    methods: {
        async initData() {
            const response = await axios.get(`/api/v1/products?categories=${this.category}`)
            this.products = response.data
            this.loading = false
        },
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
                <router-link :to="{name: 'product', params: {id: product._id}}" v-for="product in products.data" class="product-container">
                    <ProductImage :product="product"/>
                    <div class="product-title">{{product.title}}</div>
                    <p class="product-price">{{'$' + product.price}}</p>
                </router-link>
            </div>
            <LoadingSpinner v-if="loading"/>
        </div>
    </div>
</template>