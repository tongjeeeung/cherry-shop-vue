import './assets/main.css'
import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import HomePage from './pages/home-page.vue'
import CatalogPage from './pages/catalog-page.vue'
import ProductPage from './pages/product-page.vue'
import cartPage from './pages/cart-page.vue'
import RegLogPage from './pages/registration-page.vue'
import ProfilePage from './pages/profile-page.vue'
import { createPinia } from 'pinia'
import { getToken } from './utils/cookie'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', component: CatalogPage },
  { path: '/cart', component: cartPage },
  { path: '/registration', component: RegLogPage },
  { path: '/login', component: RegLogPage },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },

  { path: '/catalog/:id/:id', component: ProductPage },
  { path: '/catalog/:id', component: CatalogPage }
]

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken()

  if (isAuthenticated) {
    if (to.path === '/login' || to.path === '/registration') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

createApp(App).use(pinia).use(router).use(autoAnimatePlugin).mount('#app')
