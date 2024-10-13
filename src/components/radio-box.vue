<script setup>
const props = defineProps({
  items: { type: Object },
  brandHandle: { type: Function },
  sortHandle: { type: Function },
  clearFilter: { type: Function },
  concaveHandle: { type: Function },
  rigidityHandle: { type: Function },
  sizeHandle: { type: Function }
})
</script>

<template>
  <div class="flex flex-col gap-6 w-[10rem] mt-20 ml-6 pb-10" v-if="props.items">
    <ul>
      <li>
        <a
          class="cursor-pointer hover:text-accent duration-300 transition-all ease-in-out"
          @click="sortHandle('+')"
          >Ascending</a
        >
      </li>
      <li>
        <a
          class="cursor-pointer hover:text-accent duration-300 transition-all ease-in-out"
          @click="sortHandle('-')"
          >Descending</a
        >
      </li>
    </ul>
    <ul class="uppercase" v-auto-animate v-if="props.items.brand != undefined">
      <label>Brand</label>
      <li v-for="item in props.items.brand.sort()" :key="item">
        <label
          class="cursor-pointer relative hover:text-accent duration-300 transition-all ease-in-out"
        >
          <input
            class="appearance-none absolute top-0 left-0 w-full h-full"
            type="radio"
            @click="brandHandle(item)"
          />
          <span>{{ item }}</span>
        </label>
      </li>
    </ul>
    <ul class="uppercase" v-auto-animate v-if="props.items.size[0] != undefined">
      <label>Size</label>
      <li v-for="item in props.items.size.sort()" :key="item">
        <label
          class="cursor-pointer relative hover:text-accent duration-300 transition-all ease-in-out"
        >
          <input
            @click="sizeHandle(item)"
            class="appearance-none absolute top-0 left-0 w-full h-full"
            type="radio"
          />
          <span>{{ item }}</span>
        </label>
      </li>
    </ul>
    <ul class="uppercase" v-auto-animate v-if="props.items.concave[0] != undefined">
      <label>Concave</label>
      <li v-for="item in props.items.concave.sort()" :key="item">
        <label
          class="cursor-pointer relative hover:text-accent duration-300 transition-all ease-in-out"
        >
          <input
            @click="concaveHandle(item)"
            class="appearance-none absolute top-0 left-0 w-full h-full"
            type="radio"
          />
          <span>{{ item }}</span>
        </label>
      </li>
    </ul>
    <ul class="uppercase" v-auto-animate v-if="props.items.rigidity[0] != undefined">
      <label>Rigidity</label>
      <li v-for="item in props.items.rigidity" :key="item">
        <label
          class="cursor-pointer relative hover:text-accent duration-300 transition-all ease-in-out"
        >
          <input
            @click="rigidityHandle(item)"
            class="appearance-none absolute top-0 left-0 w-full h-full"
            type="radio"
          />
          <span>{{ item }}</span>
        </label>
      </li>
    </ul>
    <button
      @click="clearFilter"
      class="text-start hover:text-accent duration-300 transition-all ease-in-out"
    >
      Clear
    </button>
  </div>
</template>
