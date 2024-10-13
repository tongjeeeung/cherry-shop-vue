<script setup>
import Home from '../components/home-section.vue'
import Catalog from '../components/catalog-section.vue'
import ProductsSection from '../components/product-section.vue'
import AboutUs from '../components/about-us.vue'
import preloader from '@/components/preloader.vue'
import { useDataStore } from '@/services/data-store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const dataStore = useDataStore()
const { products } = storeToRefs(dataStore)
const { loading } = storeToRefs(dataStore)

const bestProducts = ref([])

if (products.value) {
  bestProducts.value = products.value.sort((a, b) => b.count - a.count)
}
</script>

<template>
  <preloader v-if="loading" />
  <div v-else>
    <Home />
    <Catalog />
    <ProductsSection
      name="Meet our best sellers"
      :items="bestProducts.slice(0, 10)"
      class="px-[5.7rem]"
    />
    <AboutUs />
  </div>
</template>
