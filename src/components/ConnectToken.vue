<template>
    <div>
        <h2>Connect to Token</h2>
        <input v-model="contractAddress" placeholder="Contract Address" />
        <button @click="connectToken">Connect</button>
        <div v-if="token">
            <p>Token Name: {{ tokenName }}</p>
            <p>Token Symbol: {{ tokenSymbol }}</p>
            <p>Total Supply: {{ totalSupply }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contractAddress: '',
        };
    },
    computed: {
        token() {
            return this.$store.state.token;
        },
        tokenName() {
            return this.$store.state.tokenName;
        },
        tokenSymbol() {
            return this.$store.state.tokenSymbol;
        },
        totalSupply() {
            return this.$store.state.totalSupply;
        },
    },
    methods: {
        connectToken() {
            this.$store.dispatch('connectToken', this.contractAddress);
        },
    },
};
</script>