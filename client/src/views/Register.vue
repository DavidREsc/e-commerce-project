<template>
    <div>
        <h1>Register</h1>
    </div>
</template>

<script>
    import axios from 'axios'
    import { store } from '../store'
    export default {
        async created() {
            const response = await axios.post('/api/v1/auth/register', {
                method: 'POST',
                firstName: 'Bela',
                lastName: 'Idiot',
                email: 'belaaaaeee@gmail.com',
                password: 'pass123'
            })
            console.log(response.data)
            store.user = response.data.token
        }
    }
</script>