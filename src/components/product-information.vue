<script setup>
import { ref } from 'vue'

defineProps({
  item: Object,
  addToCartHandle: Function,
  inCart: Boolean
})

const currentUrl = ref(false)
</script>

<template>
  <div class="px-24 py-10 relative" v-auto-animate>
    <button
      @click="$router.back()"
      class="absolute left-6 font-[Christmas] text-3xl hover:text-accent duration-300 transition-all ease-in-out"
    >
      Back
    </button>
    <div class="flex gap-10">
      <div class="flex flex-col gap-2">
        <img
          class="w-[31.25rem] h-[31.25rem] object-cover"
          :src="
            !currentUrl ? item.imgFirst : item.imgSecond !== '' ? item.imgSecond : item.imgFirst
          "
          :alt="item.name"
        />
        <ul class="flex gap-2">
          <li class="w-20 h-20" @click="currentUrl = false">
            <img
              class="hover:opacity-50 duration-300 transition-all ease-in-out object-cover w-full h-full"
              :src="item.imgFirst"
              :alt="item.name"
            />
          </li>
          <li class="w-20 h-20" @click="currentUrl = true" v-if="item.imgSecond !== ''">
            <img
              class="hover:opacity-50 duration-300 transition-all ease-in-out object-cover w-full h-full"
              :src="item.imgSecond"
              :alt="item.name"
            />
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-5xl mb-10 max-w-[52rem]">
          {{ `${item.brand.toUpperCase()} ` + item.name.toUpperCase() }}
        </h1>
        <div class="flex gap-2 font-[Christmas]" v-if="item.sale">
          <h2 class="text-xl">{{ Math.trunc((item.price * Number(100 - item.sale)) / 100) }} p.</h2>
          <h2 class="text-xl text-zinc-600 line-through">{{ item.price }} p.</h2>
        </div>
        <h2 v-else class="text-xl font-[Christmas]">{{ item.price }} p.</h2>
        <button
          @click="addToCartHandle(!inCart)"
          class="w-64 h-14 bg-mutedcl rounded-xl text-2xl font-bold mb-20 hover:bg-accent duration-300 transition-all ease-in-out"
        >
          {{ !inCart ? 'Add to cart' : 'Remove' }}
        </button>
        <p class="text-xl max-w-[52rem]">{{ item.information }}</p>
        <h3 class="text-xl">Collection: {{ item.year }}</h3>
        <h3 class="text-xl">Size: {{ item.size }}</h3>
        <h3 class="text-xl">Concave: {{ item.concave }}</h3>
      </div>
    </div>
  </div>
</template>
