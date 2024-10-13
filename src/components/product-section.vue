<script setup>
import product from './product-card.vue'
import { ref } from 'vue'

const sliceNum = ref(0)

defineProps({
  name: String,
  items: Array,
  clearFilter: Function
})
</script>

<template>
  <section class="flex flex-col gap-10 pb-10 w-full" v-if="items">
    <h2 class="text-center text-5xl font-[Christmas]">
      {{ name ? name[0].toUpperCase() + name.slice(1) : 'Catalog' }}
    </h2>
    <ul
      class="flex flex-wrap gap-x-[3.3rem] gap-y-10 min-h-[80vh]"
      v-auto-animate
      v-if="items.length > 0"
    >
      <RouterLink
        :to="{ path: `/cherry-shop-vue/catalog/${item.category}/${item.id}` }"
        v-for="item in items.length > 15 ? items.slice(sliceNum, sliceNum + 15) : items"
        :key="item.id"
      >
        <product :item="item"></product>
      </RouterLink>
    </ul>
    <div v-else class="text-center flex flex-col gap-5 items-center py-10">
      <span class="text-5xl">Nothing found :(</span>
      <button
        @click="clearFilter"
        class="w-48 h-12 mt-5 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
      >
        Clear filter
      </button>
    </div>
    <div class="flex justify-between text-textcl text-sm pr-[1.5rem]" v-if="items.length > 15">
      <span>Page number {{ (sliceNum + 15) / 15 }}</span>
      <div class="flex gap-5">
        <button
          v-if="sliceNum > 0"
          @click="
            () => {
              sliceNum -= 15
              scroll(0, 0)
            }
          "
          class="hover:text-accent duration-300 transition-all ease-in-out"
        >
          prev
        </button>
        <button
          v-if="sliceNum < items.length - 15"
          @click="
            () => {
              sliceNum += 15
              scroll(0, 0)
            }
          "
          class="hover:text-accent duration-300 transition-all ease-in-out"
        >
          next
        </button>
      </div>
      <span>Total products {{ items.slice(0, sliceNum + 15).length }}/{{ items.length }}</span>
    </div>
  </section>
</template>
