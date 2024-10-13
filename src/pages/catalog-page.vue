<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../services/data-store'
import Catalog from '../components/product-section.vue'
import RadioBox from '../components/radio-box.vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const dataStore = useDataStore()
const { filter } = storeToRefs(dataStore)

const getCategory = () => {
  return route.params.id
}

const updateCategoryData = () => {
  const { category, ...rest } = filter.value
  if (category === getCategory()) {
    const newFilter = {
      ...rest,
      category: getCategory()
    }
    dataStore.changeFilter(newFilter)
  } else {
    const newFilter = {
      category: getCategory()
    }
    dataStore.changeFilter(newFilter)
  }
}

const updateData = () => {
  dataStore.fetchData(filter.value)
}

updateCategoryData()
updateData()
scrollTo(0, 0)
watch(route, updateCategoryData)
watch(filter, updateData)

const brandHandle = (brandName) => {
  const newFilter = {
    category: filter.value.category,
    by: filter.value.by,
    concave: filter.value.concave,
    rigidity: filter.value.rigidity,
    size: filter.value.size,
    brand: brandName
  }
  dataStore.changeFilter(newFilter)
}

const sizeHandle = (sizeName) => {
  const newFilter = {
    category: filter.value.category,
    by: filter.value.by,
    concave: filter.value.concave,
    rigidity: '',
    brand: filter.value.brand,
    size: sizeName
  }
  dataStore.changeFilter(newFilter)
}

const rigidityHandle = (rigidityName) => {
  const newFilter = {
    category: filter.value.category,
    by: filter.value.by,
    concave: '',
    rigidity: rigidityName,
    brand: filter.value.brand,
    size: ''
  }
  dataStore.changeFilter(newFilter)
}

const concaveHandle = (concaveName) => {
  const newFilter = {
    category: filter.value.category,
    by: filter.value.by,
    concave: concaveName,
    rigidity: '',
    brand: filter.value.brand,
    size: filter.value.size
  }
  dataStore.changeFilter(newFilter)
}

const sortHandle = (byNum) => {
  const { by, ...rest } = filter.value
  const newFilter = {
    ...rest,
    by: byNum
  }
  dataStore.changeFilter(newFilter)
}

const clearFilter = () => {
  dataStore.changeFilter(null)
}

const filterValues = computed(() => dataStore.filterValues)
const items = computed(() => dataStore.data)
const categoryPath = computed(() => getCategory())
</script>

<template>
  <div class="flex" v-auto-animate>
    <RadioBox
      :items="filterValues"
      :brandHandle="brandHandle"
      :sortHandle="sortHandle"
      :clearFilter="clearFilter"
      :concaveHandle="concaveHandle"
      :rigidityHandle="rigidityHandle"
      :sizeHandle="sizeHandle"
    />
    <Catalog :name="categoryPath" :items="items" :clearFilter="clearFilter" />
  </div>
</template>
