<script>
    export default {
        data() {
            return {
                tax: 0.13,
                salesTax: 0,
                subTotal: 0,
                grandTotal: 0
            }
        },
        props: ['items'],
        methods: {
            calculate() {
                this.items.forEach(item => {
                    this.subTotal += item.productId.price * item.quantity
                })
                this.subTotal = parseFloat(this.subTotal).toFixed(2)
                this.salesTax = (this.subTotal * this.tax).toFixed(2)
                this.grandTotal = (parseFloat(this.subTotal) + parseFloat(this.salesTax)).toFixed(2)
            }
        },
        watch: {
            items: {
                handler() {
                    this.salesTax = 0
                    this.subTotal = 0
                    this.grandTotal = 0
                    this.calculate()
                },
                deep: true
            }
        },
        created() {
            this.calculate()
        }
    }
</script>

<template>
    <div v-if="items" class="cart-details-container">
        <ul>
            <li>
                <div class="list-item">
                    <h4>Subtotal:</h4>
                    <p>{{('$' + subTotal)}}</p>
                </div>
            </li>
            <li>
                <div class="list-item">
                    <h4>Sales Tax:</h4>
                    <p>{{('$' + salesTax)}}</p>
                </div>
            </li>
            <li>
                <div class="list-item">
                    <h4>Coupon Code:</h4>
                    <button class="add-coupon-btn">Add Coupon</button>
                </div>
            </li>
            <li>
                <div class="list-item">
                    <h4>Grand Total:</h4>
                    <p class="grand-total">{{('$' + grandTotal)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>