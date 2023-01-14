<script>
    export default {
        data() {
            return {
                loading: true
            }
        },
        props: ['product'],
        methods: {
            initData() {
                const image = this.product.image
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.src = image
                    img.onload = resolve
                    img.onerror = reject
                })
               /* const images = response.data.data.map(data => {
                return new Promise((resolve, reject) => {
                    const img  = new Image()
                    img.src = data.image
                    img.onload = resolve
                    img.onerror = reject
                })
                })
                 Promise.all(images).then(() => this.loading = false)
                .catch((e) => console.log(e))*/
            }       
        },
        async created() {
            const res = await this.initData()
            this.loading = false
        }
    }
</script>

<template>
    <div>
        <img v-if="!loading" v-bind:src="product.image" class="product-img-sm"/>
        <div v-if="loading" class="product-img-sm-loading"></div>
    </div>
</template>