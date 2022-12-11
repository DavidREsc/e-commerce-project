<script>
import axios from 'axios'
import { store } from '../store'
export default {
    methods: {
        async submitHandler(data, node) {
            const {email, password} = data
            try {
                const response = await axios.post(`/api/v1/auth/login`, {
                    method: 'POST',
                    email,
                    password
                })
                console.log(response)
                store.user = response.data.user
                this.$router.push({name: 'home'})
            } catch(e) {
                node.setErrors(['Email or password is incorrect'], null)
            }
        },
        async demoHandler() {
            try {
                const response = await axios.get(`/api/v1/auth/demo`)
                console.log(response)
                store.user = response.data.user
                this.$router.push({name: 'home'})
            } catch (error) {
                
            }
        }
    }
}
</script>

<template>
    <div class="view-container">
        <div class="form-container">
            <h1 class="login-title">Login</h1>
                <FormKit type="form" @submit="submitHandler" :incomplete-message="false">
                    <FormKit 
                        type="email"
                        label="Email"
                        name="email"
                        validation="required | email" 
                    />

                    <FormKit 
                        type="password"
                        label="Password"
                        name="password"
                        validation="required"
                    />
                </FormKit>
                <button class="demo-btn" @click="demoHandler">Demo</button>
        </div>
    </div>
</template>

<style lang="css">
    .form-container {
        margin-top: 5rem;
        padding: 3rem;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .formkit-form {
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 75%;
    }
    .formkit-input {
        width: 100rem;
    }
    [data-type=submit] .formkit-input {
        width: 10rem;
        margin-top: 2rem;
    }

    .demo-btn {
        width: 10rem;
        padding: 0.75rem;
        border-radius: 3px;
        border: none;
        margin-right: 5px;
        background-color: #e24718;
        color: white;
        cursor: pointer;
    }

    @media screen and (max-width: 481px) {
        .formkit-input {
            width: 20rem;
        }

        .form-container {
            margin-top: 0;
            box-shadow: none;
        }

        .formkit-form {
            height: 100%;
        }
    }
</style>