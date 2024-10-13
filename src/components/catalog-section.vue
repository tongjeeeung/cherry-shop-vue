<script setup></script>

<template>
  <section class="mt-20">
    <h2 class="text-center pb-7 text-5xl">Skateboarding</h2>
    <h3 class="text-center text-2xl">Skate components.</h3>
    <ul class="flex items-center justify-center flex-wrap gap-14 px-5 py-24 text-[#FAEBD7]">
      <RouterLink to="/catalog/boards">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/boards.webp')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Boards</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
      <RouterLink to="/catalog/trucks">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/trucks.jpeg')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Trucks</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
      <RouterLink to="/catalog/wheels">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/wheels.jpeg')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Wheels</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
      <RouterLink to="/catalog/bearings">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/bearings.jpeg')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Bearings</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
      <RouterLink to="/catalog/skins">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/skin.jpeg')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Skins</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
      <RouterLink to="/catalog/screwsnuts">
        <li
          class="card min-h-64 min-w-[35rem] z-[1] relative flex duration-300 transition-all ease-in-out items-center justify-center bg-[length:90%] bg-[url('/home/screws.jpeg')] bg-center"
        >
          <h4 class="text-center z-[3] text-2xl">Screws and nuts</h4>
          <div
            class="bg-black/[0.6] overlay z-[2] absolute top-0 left-0 w-full h-full duration-300 transition-all ease-in-out"
          ></div>
        </li>
      </RouterLink>
    </ul>
  </section>
</template>
