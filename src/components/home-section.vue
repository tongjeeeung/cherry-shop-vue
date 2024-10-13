<script setup>
import { ref } from 'vue'

const threme = ref(document.documentElement.classList.contains('light'))

const toggleCheckbox = () => {
  threme.value = !threme.value
  document.documentElement.classList.toggle('light')
  localStorage.setItem('light', threme.value)
}
</script>

<template>
  <section class="w-full min-h-screen overflow-hidden relative">
    <div class="bg-black/[0.6] absolute top-0 left-0 z-[-1] w-full h-full"></div>
    <div
      class="text-[#FAEBD7] flex flex-col items-center gap-10 absolute top-1/2 left-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <h1 class="font-[Christmas] text-7xl">CherryShop</h1>
      <h2 class="text-xl tracking-wide text-center">
        New Russian skate shop selling boards and promoting skateboarding to the masses.
      </h2>
      <div>
        <input type="checkbox" class="toggle-checkbox hidden" />
        <label for="toggle" class="toggle-label flex items-center cursor-pointer">
          <div class="relative" @click="toggleCheckbox">
            <div class="bg-accent w-14 h-8 rounded-full"></div>
            <div
              :class="[
                !threme ? '' : 'translate-x-full',
                'absolute left-1 top-1 bg-textcl w-6 h-6 rounded-full transition'
              ]"
            ></div>
          </div>
        </label>
      </div>
    </div>
    <video class="absolute left-0 w-full z-[-2] object-cover" muted preload="auto" loop autoplay>
      <source src="/home/logo.mp4" type="video/mp4" />
    </video>
  </section>
</template>
