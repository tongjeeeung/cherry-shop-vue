<script setup>
import Product from '../components/product-information.vue'
import OtherProducts from '../components/recomendation-component.vue'
import preloader from '@/components/preloader.vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../services/data-store'
import { storeToRefs } from 'pinia'

const route = useRoute()

const dataStore = useDataStore()
const { cart } = storeToRefs(dataStore)
const { product } = storeToRefs(dataStore)
const { loading } = storeToRefs(dataStore)
const inCart = ref(false)

const getId = () => {
  return route.params.id
}

const updateProductData = () => {
  dataStore.findProduct(getId())
  window.scrollTo(0, 0)
}

updateProductData()

watch(route, updateProductData)

inCart.value = cart.value.some((product) => product.id == getId())

function addToCartHandle(boolen) {
  inCart.value = boolen
  boolen ? dataStore.postCart(getId()) : dataStore.deleteCart(getId())
}
</script>

<template>
  <preloader v-if="loading" />
  <div v-else>
    <Product :item="product" :addToCartHandle="addToCartHandle" :inCart="inCart"></Product>
    <OtherProducts />
  </div>
</template>
