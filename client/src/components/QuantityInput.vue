<script>
export default {
    props: ['quantity'],
    methods: {
        updateQuantity(newQuantity) {
            this.$emit('update-quantity', newQuantity)
        }
    }
}
</script>

<template>
    <div>
        <button @click="updateQuantity(quantity - 1)">-</button>
        <p>{{quantity}}</p>
        <button @click="updateQuantity(quantity + 1)">+</button>
    </div>
</template>