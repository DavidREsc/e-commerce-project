import { reactive } from "vue";
import axios from 'axios'

export const store = reactive({
    user: null,
    dropdown: {
        active: false,
        image: null,
        title: null
    },
    loading: true,
    toRoute: null
})

export const activateDropDown = (image, title) => {
    store.dropdown = {
        active: true,
        image,
        title
    }
}

export const getMe = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/api/v1/auth/me`)
            store.user = response.data.user
            store.loading = false
            resolve()
        } catch (e) {
            store.loading = false
            resolve()
        }
    })
}

export const getPaymentSession = (session_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/api/v1/checkout/${session_id}`)
            console.log(response)
            resolve(true)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

