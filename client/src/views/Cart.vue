<template>
    <div className="view-container">
        <div class="cart-container">
            <h1 v-if="products" class="cart-title">{{(('Your Cart [' + products.data.products.length) + (products.data.products.length === 1 ? ' item]' : ' items]'))}}</h1>
            <CartListVue v-if="products" @update-quantity="updateQuantity($event)" @delete-item="deleteItem($event)" v-bind:items="products.data.products" />
            <CartDetailsVue v-if="(products)" v-bind:items="products.data.products"/>
            <button v-if="(products && products.data.products.length)" @click="handlePayment" :class="clicked ? 'proceed-btn active' : 'proceed-btn'">
                <LoadingSpinnerSmLt v-if="clicked"/>
                Proceed to Payment
            </button>
        </div>
        <LoadingSpinner v-if="!products"/>
    </div>
</template>

<script>
    import CartListVue from '../components/CartList.vue'
    import CartDetailsVue from '../components/CartDetails.vue'
    import LoadingSpinner from '../components/LoadingSpinner.vue'
    import LoadingSpinnerSmLt from '../components/LoadingSpinnerSmLt.vue'
    import axios from 'axios'
    import { toRaw } from 'vue'
    export default {
        data() {
            return {
                products: null,
                clicked: false
            }
        },
        components: {
            CartListVue,
            CartDetailsVue,
            LoadingSpinner,
            LoadingSpinnerSmLt
        },
        methods: {
            
            async handlePayment() {
                this.clicked = true
                const productData = toRaw(this.products)
                const products = productData.data.products.map(p => {
                    return {
                        title: p.productId.title,
                        price: p.productId.price,
                        quantity: p.quantity
                    }
                })
                try {
                    const response = await axios.post('/api/v1/checkout', {
                        method: 'POST',
                        products
                    })
                    window.location = response.data.stripeSession
                } catch (e) {
                    console.log(e)
                }
                this.clicked = false
            },

            async updateQuantity(value) {
                if (!value.quantity) return
                const response = await axios.put(`/api/v1/carts/${value.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    quantity: value.quantity
                })
                this.products = response.data
            },

            async deleteItem(id) {
                const response = await axios.delete(`/api/v1/carts/${id}`)
                this.products = response.data
            } 
        },
        async created() {
            const response = await axios.get('/api/v1/carts')
            this.products = response.data
        }
    }
</script>