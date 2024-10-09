import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const app = createApp(App)

app.use(autoAnimatePlugin)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

app.use(createPinia())

app.use(router)

app.mount('#app')
