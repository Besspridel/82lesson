import { createRouter, createWebHistory } from 'vue-router'
import ConnectWallet from "@/components/ConnectWallet.vue"
import DeployToken from "@/components/DeployToken.vue"
import TokenFunctions from "@/components/TokenFunctions.vue"
import ConnectToken from "@/components/ConnectToken.vue"

const routes = [
  {
    path: '/',
    name: 'connectWallet',
    component: ConnectWallet
  },
  {
    path: '/deploy',
    name: 'DeployToken',
    component: DeployToken
  },
  {
    path: '/token-functions',
    name: 'TokenFunctions',
    component: TokenFunctions
  },
  {
    path: '/connect-token',
    name: 'ConnectToken',
    component: ConnectToken
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
