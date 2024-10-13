<script setup>
import { useDataStore } from '@/services/data-store'
import Product from './product-card.vue'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const { products } = storeToRefs(dataStore)

const recProducts = getRandomItems(products.value, 8)

function getRandomItems(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, num)
}
</script>

<template>
  <div class="px-24">
    <h2 class="text-5xl font-[Christmas] text-center">Interesting products</h2>
    <ul class="flex gap-3 overflow-x-scroll py-5 h-[28rem]" v-auto-animate>
      <RouterLink
        class="min-w-[208px]"
        :to="{ path: `/cherry-shop-vue/catalog/${item.category}/${item.id}` }"
        v-for="item in recProducts"
        :key="item.id"
      >
        <Product :item="item"></Product>
      </RouterLink>
    </ul>
  </div>
</template>
