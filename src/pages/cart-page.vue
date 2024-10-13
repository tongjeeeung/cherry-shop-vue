<script setup>
import cartComponent from '@/components/cart-component.vue'
import { useDataStore } from '@/services/data-store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const dataStore = useDataStore()
const router = useRouter()

const { cart } = storeToRefs(dataStore)
const { user } = storeToRefs(dataStore)

const addMoreHandle = (id, isMore) => {
  dataStore.findProduct(id)
  dataStore.postCart(id, isMore)
}

const sendOrder = (data) => {
  dataStore.postOrder(data)
}

const handleBrand = (brandName) => {
  const { brand, category, ...rest } = dataStore.filter
  const newFilter = { ...rest, brand: brandName, category: undefined }
  dataStore.changeFilter(newFilter)
  router.push('/cherry-shop-vue/catalog')
}
</script>

<template>
  <cartComponent
    :data="cart"
    :addMoreHandle="addMoreHandle"
    :sendOrder="sendOrder"
    :user="user"
    :handleBrand="handleBrand"
  ></cartComponent>
</template>
