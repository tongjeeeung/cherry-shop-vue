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
  { path: '/cherry-shop-vue/', name: 'Home', component: HomePage },
  { path: '/cherry-shop-vue/catalog', component: CatalogPage },
  { path: '/cherry-shop-vue/cart', component: cartPage },
  { path: '/cherry-shop-vue/registration', component: RegLogPage },
  { path: '/cherry-shop-vue/login', component: RegLogPage },
  { path: '/cherry-shop-vue/profile', component: ProfilePage, meta: { requiresAuth: true } },

  { path: '/cherry-shop-vue/catalog/:id/:id', component: ProductPage },
  { path: '/cherry-shop-vue/catalog/:id', component: CatalogPage }
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
