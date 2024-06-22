<template>
    <div>
        <button @click="connectWallet">Connect Wallet</button>
        <p v-if="account">Connected account: {{ account }}</p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
    computed: {
        ...mapState(['account'])
    },
    methods: {
        ...mapActions(['connectWallet']),
    },
}
</script>


<style scoped>
button {
    margin: 20px;
    padding: 10px 20px;
}
</style>
