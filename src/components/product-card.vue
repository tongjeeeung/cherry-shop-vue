<script setup>
import { ref } from 'vue'
defineProps({ item: Object })

let mouseOver = ref(false)
</script>

<template>
  <li
    class="flex flex-col gap-5 relative"
    @mouseover="mouseOver = true"
    @mouseleave="mouseOver = false"
  >
    <img
      class="h-60 w-52 object-cover"
      :src="'/cherry-shop-vue' + mouseOver && item.imgSecond !== '' ? item.imgSecond : item.imgFirst"
    />
    <div
      v-if="item.sale !== ''"
      class="font-[Christmas] uppercase text-xs bg-accent flex items-center justify-center rounded-[50%] absolute top-2 right-2 w-10 h-10"
    >
      <span class="">Sale</span>
    </div>
    <div class="flex justify-between text-base h-12">
      <h3 class="max-w-[9.5rem] max-h-12 text-ellipsis overflow-hidden">
        {{
          mouseOver && item.size
            ? item.size
            : `${item.brand.toUpperCase()} ` + item.name.toUpperCase()
        }}
      </h3>
      <h4 class="font-[Christmas]">{{ item.price }} p.</h4>
    </div>
  </li>
</template>
