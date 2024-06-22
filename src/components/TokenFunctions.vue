<template>
    <div>
        <h3>Token Functions</h3>
        <div v-if="contractFunctions.length">
            <div v-for="func in contractFunctions" :key="func.name" class="function-card">
                <h4> {{ func.name }} </h4>
                <div v-for="(input, index) in func.inputs" :key="index" class="form-group">
                    <label :for="func.name + '-' + input.name">{{ input.name }} ({{ input.type }})</label>
                    <input
                        :id="`${func.name}-${index}`" 
                        v-model="args[func.name][index]"
                        class="form-control"
                        :placeholder="input.name"
                    />
                </div>
                <button @click="callFunction(func.name)" class="btn btn-primary">Call {{ func.name }}</button>
                <div v-if="functionOutputs[func.name]">
                    <strong>Output:</strong> {{ functionOutputs[func.name] }}
                </div>
            </div>
        </div>
        <div v-else>
            <p>No functions available. Please connect to a token contract.</p>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { mapState, mapActions } from 'vuex';

    export default {
        data() {
            return {
                args: reactive({}),
            };
        },
        computed: {
            ...mapState(['contractFunctions', 'functionOutputs']),
        },
        watch: {
            contractFunctions: {
                immediate: true,
                handler(functions) {
                    functions.forEach(func => {
                        if (!this.args[func.name]) {
                            this.args[func.name] = Array(func.inputs.length).fill('');
                        }
                    });
                }
            }
        },
        methods: {
            ...mapActions(['callContractFunction']),
            async callFunction(functionName) {
                try {
                    const args = this.args[functionName].map(arg => {
                    if (arg.startsWith('0x') && arg.length === 42) {
                        return arg; // Assume it's already a valid Ethereum address
                    } else if (!isNaN(arg)) {
                         return arg.toString(); // Convert to string
                    } else {
                        return arg; // Leave as is
                    }
                });
                    await this.callContractFunction({ functionName, args });
                } catch (error) {
                    console.error(`Failed to call function ${functionName}:`, error);
                    this.$store.commit('setFunctionError', { functionName, error: error.message });
                }
            }
        }
    };
</script>

<style scoped>
.function-card {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>