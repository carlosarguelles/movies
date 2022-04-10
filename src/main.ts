import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Mount app
app.mount('#app')
