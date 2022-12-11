<script>
    export default {
        props: ['items'],
        methods: {
            updateQuantity(value, min) {
                if (min) return
                this.$emit('update-quantity', value)
            },
            deleteItem(value) {
                this.$emit('delete-item', value)
            }
        }
    }
</script>

<template>
    <div v-if="items.length" class="cart-list-container">
        <table>
            <tr>
                <th>Item</th>
                <th class="price-th">Price</th>
                <th>Quantity</th>
                <th class="total-th">Total</th>
            </tr>
            <tr v-for="item in items">
                <td class="item-col"><div class="item-col-container"><img class='product-img-ssm' :src="item.productId.image"/><p class="item-title">{{item.productId.title}}</p></div></td>
                <td class="price-col">{{'$' + item.productId.price}}</td>
                <td class="quantity-col"> 
                    <div class="quantity-input">
                        <button title='Decrease quantity' class='quantity-input-btn left' @click="updateQuantity({id: item.productId._id, quantity: -1}, !(item.quantity - 1) ? true : null)">-</button>
                        <p class="quantity-input-value">{{item.quantity}}</p>
                        <button title="Increase quantity" class='quantity-input-btn right' @click="updateQuantity({id: item.productId._id, quantity: 1})">+</button>
                    </div>
                    <div class="price-del-col">
                        <p class="total-price-mb">{{('$' + (item.productId.price * item.quantity).toFixed(2))}}</p>
                        <button @click="deleteItem(item.productId._id)" title='Delete item' class="delete-item-btn-sm"><v-icon name='co-delete' /></button>
                    </div>
                </td>
                <td class="total-price-col">
                    <div class="price-del-col">
                        <p class="total-price-item">{{('$' + (item.productId.price * item.quantity).toFixed(2))}}</p>
                        <button title='Delete item' class="delete-item-btn" @click="deleteItem(item.productId._id)">
                            <v-icon name="co-delete" scale="1.5" />
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

