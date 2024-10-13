<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/header-component.vue'
import Footer from './components/footer-component.vue'
import { useDataStore } from './services/data-store'
import { getToken } from './utils/cookie'

const dataStore = useDataStore()

onMounted(() => {
  dataStore.fetchProducts()

  if (JSON.parse(localStorage.getItem('light')!) === true) {
    document.documentElement.classList.toggle('light')
  }

  if (getToken()) {
    dataStore.fetchUser()
  }
})
</script>

<template>
  <Header />
  <main class="min-h-[32rem]">
    <RouterView />
  </main>
  <Footer />
</template>
