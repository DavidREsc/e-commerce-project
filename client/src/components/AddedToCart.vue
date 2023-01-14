<script>
    import { store } from '../utils';
    export default {
        data() {
            return {store}
        },
        methods: {
            closeDropDown() {
                store.dropdown.active = false
            }
        }
    }
</script>


<template>
    <div :class="store.dropdown.active ? 'dropdown active' : 'dropdown'">
        <img class='dropdown-img' :src="store.dropdown.image" />
        <p class="dropdown-title">{{store.dropdown.title}}</p>
        <div class="dropdown-btn-container">
            <button @click="closeDropDown" class="dropdown-btn">Continue Shopping</button>
            <router-link @click="closeDropDown" :to="{name: 'cart'}"><button class="dropdown-btn">Go To Cart</button></router-link>
        </div>
    </div>
</template>

<style lang="css">

    .dropdown-title {width: 300px;}
    .dropdown {
        width: 50%;
        background-color: #fefefefe;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        position: fixed;
        height: 10rem;
        z-index: 1;
        top: -100%;
        transition: all 0.4s ease;
        margin: auto;
        left: 25%;
        display: flex;
        padding: 2rem;
        gap: 50px;
        justify-content: center;
        align-items: center;
    }

    .dropdown-img {
        width: 75px;
        height: 75px;
    }

    .dropdown.active {
        position: fixed;
        transition: all 0.3s ease;
        top: 0%;
        width: 50%;
        left: 25%;
        display: flex;
        padding: 2rem;
        gap: 50px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        justify-content: center;
        align-items: center;
    }

    .dropdown-btn {
        width: 100px;
        height: 50px;
        cursor: pointer;
        border: none;
        background-color: rgb(212, 209, 209);
        border: 1px solid black;
    }

    .dropdown-btn-container {
        display: flex;
        align-items: center;
        gap: 25px;
    }




    @media screen and (max-width: 820px) {
        .dropdown {
            width: 100%;
            left: 0;
            gap: 20px;
        }

        .dropdown-btn-container {
            display: flex;
            gap: 10px;
            flex-direction: column;
        }

        .dropdown.active {
            width: 100%;
            left: 0;
            align-items: center;
            gap: 20px;
        }

        .dropdown-btn {
            width: 75px;
            height: 50px;
        }
        .dropdown-img {
            width: 75px;
            height: 60px;
        }

        .dropdown-title {
            width: 250px;
        }
    }

    @media only screen and (min-width: 3000px) {
        .dropdown.active {
            height: 15rem;
        }
    }
</style>