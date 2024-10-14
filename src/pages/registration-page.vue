<script setup>
import Registration from '../components/reg-log-component.vue'
import { ref, watch } from 'vue'
import { useDataStore } from '@/services/data-store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const dataStore = useDataStore()
const path = ref(route.path.replace(/\/cherry-shop-vue\//g, ''))

watch(
  () => route.path,
  (newPath) => {
    path.value = newPath.replace(/\/cherry-shop-vue\//g, '')
  }
)

const handleSubmitFunction = (data) => {
  if (path.value === 'registration') {
    dataStore.registrationUser(data)
  } else {
    dataStore.loginUser(data)
  }
}

const handleChangePath = () => {
  if (path.value === 'registration') {
    router.push('/cherry-shop-vue/login')
  } else {
    router.push('/cherry-shop-vue/registration')
  }
}
</script>

<template>
  <Registration
    :path="path"
    :handleSumbitFunction="handleSubmitFunction"
    :handleChangePath="handleChangePath"
  ></Registration>
</template>
