<script setup>
import Registration from '../components/reg-log-component.vue'
import { ref, watch } from 'vue'
import { useDataStore } from '@/services/data-store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const dataStore = useDataStore()
const path = ref(route.path.replace(/\//g, ''))

watch(
  () => route.path,
  (newPath) => {
    path.value = newPath.replace(/\//g, '')
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
    router.push('/login')
  } else {
    router.push('/registration')
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
