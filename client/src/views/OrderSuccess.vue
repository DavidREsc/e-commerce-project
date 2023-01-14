<script>
import {store} from '../utils.js'
import axios from 'axios'
export default {
    data() {
        return {
            user: store.user
        }
    },
    async created() {
        await axios.delete(`/api/v1/carts`)

    }
}

</script>

<template>
    <div class="order-success-container">
        <div class="order-success">
            <v-icon class='checkmark' name="io-checkmark-done-circle-sharp" scale="8"/>
            <h1 class="success-h1">You're all set!</h1>
            <h3 class="success-order-num">{{'ORDER #: ' +  5545}}</h3>
        </div>
        <p class="success-notification">{{"Thank you for your purchase! An email receipt including " +
            "the details about your order has been sent to " + user.email}}
        </p>
        <h3 class="success-storename">Departlux</h3>
    </div>
</template>

<style lang="css">
    .order-success-container {
        background-color: #fefefe;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
    }

    .checkmark {
        color: green;
        margin: 0;
    }

    .order-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        gap: 5px;
    }

    .success-h1 {
        margin: 0;
        font-size: 40px;
    }

    .success-order-num {
        margin: 0;
        background-color: #aaa;
        border-radius: 20px;
        padding: 5px 10px 5px 10px;
    }

    .success-notification {
        width: 35%;
        text-align: center;
        font-size: 22px;
    }

    .success-storename {
        font-size: 22px;
    }

    @media only screen and (min-width: 321px) {
        .success-notification {
            width: 95%;
        }
    }

    @media only screen and (min-width: 1024px) {
        .success-notification {
            width: 60%;
        }

        .order-success-container {
            margin-top: 0rem;
        }
    }

    @media only screen and (min-width: 1824px) {
        .success-notification {
            width: 40%;
        }

        .order-success-container {
            margin-top: 5rem;
        }
    }

    @media only screen and (min-width: 3000px) {
        .success-notification {
            width: 40%;
            font-size: 35px;
        }

        .order-success-container {
            margin-top: 5rem;
            gap: 4rem;
        }

        .success-order-num {
            margin: 0;
            background-color: #aaa;
            border-radius: 20px;
            padding: 15px 20px 15px 20px;
            font-size: 35px;
        }

        .order-success {
            gap: 0.8rem;
        }

        .success-storename {
            font-size: 40px;
        }

        .success-h1 {
            font-size: 55px;
        }
    }

</style>