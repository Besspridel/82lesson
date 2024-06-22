import { createStore } from 'vuex'
const { ethers } = require('ethers')
import { ERC20ABI } from "../contracts/ERC20.abi.js"
import { bytecode } from '@/contracts/ERC20.bin.js';
let provider;

export default createStore({
state: {
    admins: [],
    admin: false,
    provider: {},
    account: null,
    token: null,
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '',
    contractAddress: '',
    contractFunctions: [],
    functionOutputs: {}
},
getters: {

},
mutations: {
    setAccount(state, account) {
        state.account = account;
    },
    setToken(state, token) {
        state.token = token;
    },
    setTokenDetails(state, { name, symbol, totalSupply }) {
        state.tokenName = name;
        state.tokenSymbol = symbol;
        state.totalSupply = totalSupply;
    },
    setFunctionError(state, { functionName, error }) {
        state.functionErrors = { ...state.functionErrors, [functionName]: error };
    },
    setContractAddress(state, address) {
        state.contractAddress = address;
    },
    setContractFunctions(state, functions) {
        state.contractFunctions = functions
    },
    setFunctionOutput(state, {functionName, output}) {
        state.functionOutputs = {...state.functionOutputs, [functionName]: output}
    },
    setProvider(state, provider) {
        state.provider = provider;
    },
    setSigner(state, signer) {
        state.signer = signer;
    },
},
actions: {
    async connectToProvider({ commit }) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        commit('setProvider', provider);
        commit('setSigner', signer);
    },
    async deployToken({commit}, {name, symbol, decimals}) {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            console.log(provider)

            const factory = new ethers.ContractFactory(ERC20ABI, bytecode, signer);
            console.log(factory)

            const erc20 = await factory.deploy(name, symbol, decimals)
            await erc20.waitForDeployment()
            commit('setContractAddress', erc20.target);
            console.log('Token deployed at:', erc20.target);
        } catch (err) {
            console.error("Error deploying contract", err)
        }
    },
    async connectToken({commit}, contractAddress) {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            const token = new ethers.Contract(contractAddress, ERC20ABI, signer)
            const name = await token.name()
            const symbol = await token.symbol()
            const totalSupply = ethers.formatUnits(await token.totalSupply(), 18)

            commit('setToken', token);
            commit('setTokenDetails', { name, symbol, totalSupply });
            commit('setContractAddress', contractAddress);

            const contractFunctions = ERC20ABI.filter(item => item.type === 'function');
            commit('setContractFunctions', contractFunctions);
        } catch (err) {
            console.error('Error connecting to contract:', err)
        }
    }, 
    async callContractFunction({state, commit}, {functionName, args}) {
        if (!state.token) {
            alert('Please connect to a token contract first.');
            return;
        }
        if (!state.token[functionName]) {
            commit('setFunctionError', { functionName, error: 'Function not found in contract' });
            return;
        }
        

        try {
            const func = state.token[functionName]
            if (!func) {
                alert('Function not found in contract.');
                return;
            }

            const result = await state.token[functionName](...args);
            if (typeof result === 'object' && result.hasOwnProperty('hash')) {
                // If result is a transaction object (e.g., mint function)
                commit('setFunctionOutput', { functionName, output: `Transaction Hash: ${result.hash}` });
            }else {
                // Handle other types of return values
                commit('setFunctionOutput', { functionName, output: result });
            }
              commit('setFunctionError', { functionName, error: null }); // clear any previous error
        } catch (error) {
            console.error(`Error calling function ${functionName}:`, error);
            alert(`Failed to call function ${functionName}. Please check the arguments and try again.`);
        }
    }
},
modules: {
    
}
})
