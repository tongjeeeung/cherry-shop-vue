<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({ data: Array, handleIsSearch: Function, filterBrand: Function })

const searchTerm = ref('')
const filteredResults = ref([])
const isPopupVisible = ref(false)

const searchValues = (searchElement) => {
  const results = []
  const brandSet = new Set()

  props.data.forEach((product) => {
    if (product.name.toUpperCase().startsWith(searchElement.toUpperCase())) {
      results.push({
        category: product.category,
        name: product.name,
        id: product.id,
        img: product.imgFirst
      })
    }
    if (product.brand.toUpperCase().startsWith(searchElement.toUpperCase())) {
      if (!brandSet.has(product.brand)) {
        brandSet.add(product.brand)
        results.push({ brand: product.brand })
      }
    }
  })

  return results
}

const cashFunction = (fn) => {
  const cache = {}
  return function (n) {
    if (cache[n]) {
      return cache[n]
    }
    const result = fn(n)
    cache[n] = result
    return result
  }
}

const fnSearch = cashFunction(searchValues)

const handleInputChange = (e) => {
  const value = e.target.value
  searchTerm.value = value
  if (value.trim() === '') {
    filteredResults.value = []
    isPopupVisible.value = false
  } else {
    const valueSearch = fnSearch(value).slice(0, 8)
    filteredResults.value = valueSearch
    isPopupVisible.value = true
  }
}

const handleItemClick = (value, id, category, brand) => {
  if (value) {
    searchTerm.value = value
  } else searchTerm.value = brand

  isPopupVisible.value = false

  props.handleIsSearch()
  brand ? props.filterBrand(brand) : ''

  value ? router.push(`/cherry-shop-vue/catalog/${category}/${id}`) : router.push(`/cherry-shop-vue/catalog`)
}
</script>

<template>
  <form class="w-full">
    <input
      type="search"
      :value="searchTerm"
      v-on:input="handleInputChange"
      @click="isPopupVisible = !isPopupVisible"
      class="block w-full p-5 text-xl border-b shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
      placeholder="Search"
    />
    <ul class="flex flex-col" v-if="isPopupVisible" v-auto-animate>
      <li
        v-for="item in filteredResults"
        :key="item.id"
        @click="handleItemClick(item.name, item.id, item.category, item.brand)"
        class="relative cursor-pointer flex justify-between items-center py-2 px-5 text-lg border-b hover:border-accent duration-300 transition-all ease-in-out"
      >
        <div
          class="absolute bg-gradient-to-r from-black/[0.6] to-black top-0 left-0 w-full h-full object-cover z-[-1]"
          v-if="item.img"
        ></div>
        <img
          class="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
          :src="'/cherry-shop-vue' + item.img"
          v-if="item.img"
        />
        <span class="uppercase">{{ item.name ? item.name : item.brand }}</span>
        <span class="text-sm text-neutral-600">{{ item.category ? item.category : 'brand' }}</span>
      </li>
    </ul>
  </form>
</template>
