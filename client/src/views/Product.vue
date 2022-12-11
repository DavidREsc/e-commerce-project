<script>
import axios from 'axios'
import { activateDropDown } from '../store'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import LoadingSpinnerSm from '../components/LoadingSpinnerSm.vue'
export default {
    data () {
        return {
            product: null,
            quantity: 1,
            clicked: false
        }
    },
    components: {LoadingSpinner, LoadingSpinnerSm},
    props: ['id'],
    methods: {
        async initData() {
            console.log(this.id)
            const response = await axios.get(`/api/v1/products/${this.id}`)
            this.product = response.data
        },
        async addToCart() {
            this.clicked = true
            try {
                const response = await axios.put(`/api/v1/carts/${this.id}`, {
                    method: 'PUT',
                    quantity: this.quantity
                })
                activateDropDown(this.product.data.image, this.product.data.title)
            } catch (e) {
                const code = e.response.status
                if (code === 401) this.$router.push({name: 'cart'})
            }
            this.clicked = false
        }
    },
    created() {
        this.initData()
    }
}
</script>

<template>
    <div class="view-container">
        <div v-if="product" class="product-view-container">
            <div class="product-img-lg-container">
                <img v-bind:src="product.data.image" class="product-img-lg"/>
            </div>
            <div class="product-info">
                <div>
                    <h1 class="product-info-title">{{product.data.title}}</h1>
                    <p class="product-desc">{{product.data.description}}</p>
                </div>
                <div class="product-actions">
                    <h2>{{'Price: $' + product.data.price}}</h2>
                    <div class="select-quantity-container">
                    <label for="quantity">Quantity: </label>
                        <select v-model="quantity" name="quantity" class="select-quantity">
                            <option :value="1">1</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                            <option :value="5">5</option>
                            <option :value="6">6</option>
                            <option :value="7">7</option>
                            <option :value="8">8</option>
                            <option :value="9">9</option>
                            <option :value="10">10</option>
                        </select>
                    </div>
                    <button @click="addToCart" :class="clicked ? 'add-to-cart-btn-lg active' : 'add-to-cart-btn-lg'">
                        <LoadingSpinnerSm v-if="clicked"/>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        <LoadingSpinner v-if="!product"/>
    </div>
</template>