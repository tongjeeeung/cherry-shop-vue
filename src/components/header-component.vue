<script setup>
import Search from './search-component.vue'
import { useDataStore } from '../services/data-store'
import { ref, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const dataStore = useDataStore()
const closeTimeout = ref(null)
const isSearchOpen = ref(false)

const filterBrand = (brandName) => {
  const { brand, category, ...rest } = dataStore.filter
  const newFilter = { ...rest, brand: brandName, category: undefined }
  dataStore.changeFilter(newFilter)
}

const showMenu = () => {
  isMenuOpen.value = true
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
  }
}

const startTimeout = () => {
  closeTimeout.value = setTimeout(() => {
    isMenuOpen.value = false
  }, 500)
}

onUnmounted(() => {
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
  }
})

function handleIsSearch() {
  isSearchOpen.value = !isSearchOpen.value
}
</script>

<template>
  <Search
    :data="dataStore.products"
    :handleIsSearch="handleIsSearch"
    :filterBrand="filterBrand"
    v-if="isSearchOpen"
  ></Search>
  <header
    class="max-h-[100px] bg-defaultbg/[0.8] flex justify-between p-5 text-xl items-center relative"
    v-auto-animate
  >
    <img class="h-16 w-16" src="/home/logo.png" @click="toggleThreme" />
    <ul class="flex gap-12 justify-around items-center">
      <RouterLink to="/">
        <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
          Home
        </li>
      </RouterLink>
      <RouterLink to="/catalog">
        <li
          class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent relative"
          @mouseenter="showMenu"
          @mouseleave="startTimeout"
        >
          Catalog
          <div class="absolute top-0 left-0 h-[65px] w-[60px]"></div>
        </li>
      </RouterLink>
      <li
        class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent"
        @click="handleIsSearch"
      >
        Search
      </li>
      <RouterLink to="/cart">
        <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
          {{ `Cart [${dataStore.cart.length}]` }}
        </li>
      </RouterLink>
      <RouterLink to="/profile">
        <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
          Profile
        </li>
      </RouterLink>
    </ul>
    <div
      class="bg-defaultbg w-full h-[90px] top-[85px] left-0 absolute box-content z-[2]"
      v-if="isMenuOpen"
      @mouseenter="showMenu"
      @mouseleave="startTimeout"
    >
      <div class="flex flex-row-reverse gap-20 mr-[7.6rem]">
        <ul>
          <RouterLink to="/catalog/bearings">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Bearing
            </li>
          </RouterLink>
          <RouterLink to="/catalog/skins">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Skins
            </li>
          </RouterLink>
          <RouterLink to="/catalog/screwsnuts">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Screws and nuts
            </li>
          </RouterLink>
        </ul>
        <ul>
          <RouterLink to="/catalog/boards">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Boards
            </li>
          </RouterLink>
          <RouterLink to="/catalog/trucks">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Trucks
            </li>
          </RouterLink>
          <RouterLink to="/catalog/wheels">
            <li class="cursor-pointer duration-300 transition-all ease-in-out hover:text-accent">
              Wheels
            </li>
          </RouterLink>
        </ul>
      </div>
    </div>
  </header>
</template>
