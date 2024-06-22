<template>
  <div>
    <h2>Deploy new ERC20 Token</h2>
    <form @submit.prevent="deployToken">
        <div>
            <label for="name">Token Name:</label>
            <input id="name" v-model="name" type="text" required>
        </div>
        <div>
            <label for="symbol">Token Symbol:</label>
            <input id="symbol" v-model="symbol" type="text" required>
        </div>
        <div>
            <label for="initialSupply">Initial Supply:</label>
            <input id="initialSupply" v-model="initialSupply" type="number" required>
        </div>
        <button type="submit">Deploy</button>
        <p v-if="contractAddress">Deployed Contract Address: {{ contractAddress }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            symbol: '',
            decimals: 18,
        };
    },
    computed: {
        contractAddress() {
            return this.$store.state.contractAddress;
        },
    },
    methods: {
        deployToken() {
            this.$store.dispatch('deployToken', {
                name: this.name,
                symbol: this.symbol,
                decimals: this.decimals,
            });
        },
    },
};
</script>


<style scoped>
form {
    margin-bottom: 20px;
}
form div {
    margin-bottom: 10px;
}
</style>
