<script setup>
import { useDataStore } from '@/services/data-store'
import Profile from '../components/profile-component.vue'
import { storeToRefs } from 'pinia'
import preloader from '@/components/preloader.vue'
import { useRouter } from 'vue-router'

const dataStore = useDataStore()
const { user } = storeToRefs(dataStore)
const { loading } = storeToRefs(dataStore)

const handleSumbitFunction = (data) => {
  Object.keys(data.value).forEach((key) => {
    if (data.value[key] === undefined) {
      delete data.value[key]
    }
  })
  dataStore.patchUser(data.value)
}

const handleLogout = () => {
  dataStore.logoutUser()
  useRouter.push('/cherry-shop-vue/')
}

const handleDelete = (id) => {
  dataStore.deleteUser(id)
  useRouter.push('/cherry-shop-vue/')
}
</script>

<template>
  <preloader v-if="loading" />
  <Profile
    v-else
    :user="user"
    :handleSumbitFunction="handleSumbitFunction"
    :handleLogout="handleLogout"
    :handleDelete="handleDelete"
  ></Profile>
</template>
