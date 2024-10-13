<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  data: Array,
  addMoreHandle: Function,
  sendOrder: Function,
  user: Object,
  handleBrand: Function
})

const orderData = ref({
  first: '',
  second: '',
  email: '',
  phone: '',
  address: '',
  products: null
})

if (props.user) {
  orderData.value.first = props.user.first
  orderData.value.second = props.user.second
  orderData.value.email = props.user.email
  orderData.value.phone = props.user.phone
  orderData.value.address = props.user.address
}

const total = ref(0)
const sale = ref(0)

const secondStep = ref(false)

const totalFunction = () => {
  total.value = 0
  sale.value = 0

  props.data.map((product) => {
    total.value +=
      ((Number(product.price) * (100 - Number(product.sale))) / 100) *
      product.count *
      (product.category == 'trucks' ? 2 : 1)
    sale.value += Number(product.sale) * product.count
  })
}

totalFunction()

const localErrors = ref({})

const validateNames = (str) => {
  return str.trim().length >= 2 ? '' : 'Must be at least 2 characters'
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) ? '' : 'Invalid email address'
}

const validatePhone = (newPhone) => {
  const phonePattern = /^\+?[1-9]\d{1,14}$/
  return phonePattern.test(newPhone) ? '' : 'Please enter a valid phone number'
}

const handleFirstNameChange = (e) => {
  const newName = e.target.value
  orderData.value.first = newName
  localErrors.value.first = validateNames(newName)
}

const handleSecondNameChange = (e) => {
  const newName = e.target.value
  orderData.value.second = newName
  localErrors.value.second = validateNames(newName)
}

const handleEmailChange = (e) => {
  const newEmail = e.target.value
  orderData.value.email = newEmail
  localErrors.value.email = validateEmail(newEmail)
}

const handlePhoneChange = (e) => {
  const newPhone = e.target.value
  orderData.value.phone = newPhone
  localErrors.value.phone = validatePhone(newPhone)
}

const handleAddressChange = (e) => {
  orderData.value.address = e.target.value
}

const handleSubmit = () => {
  validateNames(orderData.value.first)
  validateNames(orderData.value.second)
  validateEmail(orderData.value.email)
  validatePhone(orderData.value.phone)

  if (
    !localErrors.value.first &&
    !localErrors.value.second &&
    !localErrors.value.email &&
    !localErrors.value.phone
  ) {
    orderData.value.products = props.data
    props.sendOrder(orderData.value)
  }
}
</script>

<template>
  <section class="p-24 pt-2" v-if="data.length > 0">
    <h1 class="font-[Christmas] text-center text-5xl mb-10">Cart</h1>
    <ul class="flex flex-col gap-5 max-h-[32rem] overflow-y-scroll" v-auto-animate>
      <li
        v-for="item in data"
        :key="item.id"
        class="flex justify-between items-center py-5 px-12 border-solid border-textcl border hover:animate-shadow hover:border-accent duration-300 transition-all ease-in-out"
      >
        <div class="flex gap-5 items-center">
          <img class="object-cover w-40 h-40" :src="'/cherry-shop-vue' + item.imgFirst" />
          <div class="flex flex-col gap-8 max-w-56">
            <RouterLink :to="{ path: `/cherry-shop-vue/catalog/${item.category}/${item.id}` }">
              <h2
                class="uppercase text-xl font-bold hover:text-accent duration-300 transition-all ease-in-out cursor-pointer"
              >
                {{ item.name }}
              </h2>
            </RouterLink>
            <h3
              @click="handleBrand(item.brand)"
              class="lowercase text-neutral-600 hover:text-textcl duration-300 transition-all ease-in-out cursor-pointer"
            >
              {{ item.brand }}
            </h3>
          </div>
        </div>
        <div class="flex gap-5 text-xl font-bold">
          <button
            class="hover:text-accent duration-300 transition-all ease-in-out cursor-pointer"
            @click="
              () => {
                addMoreHandle(item.id, false), totalFunction()
              }
            "
          >
            -
          </button>
          <span class="">[{{ item.count }}]</span>
          <button
            class="hover:text-accent duration-300 transition-all ease-in-out cursor-pointer"
            @click="
              () => {
                addMoreHandle(item.id, true), totalFunction()
              }
            "
          >
            +
          </button>
        </div>
        <div v-if="item.sale !== ''" class="text-xl font-[Christmas]">
          <h2>
            {{
              (item.category == 'trucks' ? 2 : 1) *
              Math.trunc((item.price * Number(100 - item.sale)) / 100)
            }}
            p.
          </h2>
          <h2 class="text-zinc-600 line-through">
            {{ (item.category == 'trucks' ? 2 : 1) * item.price }} p.
          </h2>
        </div>
        <span v-else class="text-xl font-[Christmas]"
          >{{ (item.category == 'trucks' ? 2 : 1) * item.price }} p.</span
        >
      </li>
    </ul>
    <h2 class="mb-10 mt-2">total in cart {{ data.length }}</h2>
    <ul class="flex flex-col">
      <li class="flex justify-between">
        <span class="uppercase text-xl">Sale</span>
        <span class="text-xl font-[Christmas]">{{ sale }}%</span>
      </li>
      <li class="flex justify-between">
        <span class="uppercase text-xl">Total</span>
        <span class="text-xl font-[Christmas]">{{ Math.trunc(total) }} p.</span>
      </li>
    </ul>
    <div class="flex justify-between" v-if="!secondStep">
      <button
        @click="useRouter().back()"
        class="w-48 h-12 mt-5 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
      >
        Cancel
      </button>
      <button
        class="w-48 h-12 mt-5 text-xl border-solid border-accent border hover:border-textcl animate-shadow duration-300 transition-all ease-in-out"
        @click="secondStep = true"
      >
        Buy
      </button>
    </div>
    <form class="mt-5" v-else v-auto-animate @submit.prevent="handleSubmit">
      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">First-Name</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="text"
        id="first"
        placeholder="Tong"
        @input="handleFirstNameChange"
        :value="orderData.first"
      />
      <span class="text-sm text-accent" v-if="localErrors.first">{{ localErrors.first }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Second-Name</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="text"
        id="second"
        placeholder="Btlushka"
        @input="handleSecondNameChange"
        :value="orderData.second"
      />
      <span class="text-sm text-accent" v-if="localErrors.second">{{ localErrors.second }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Tel</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="tel"
        id="phone"
        placeholder="+7 495 325 45 22"
        :value="orderData.phone"
        @input="handlePhoneChange"
      />
      <span class="text-sm text-accent" v-if="localErrors.phone">{{ localErrors.phone }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Email</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="email"
        id="email"
        placeholder="tngtng@gmail.com"
        :value="orderData.email"
        @input="handleEmailChange"
      />
      <span class="text-sm text-accent" v-if="localErrors.email">{{ localErrors.email }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Address</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="address"
        placeholder="Moscow, Bekhtereva, 15"
        :value="orderData.address"
        @input="handleAddressChange"
      />

      <div class="flex justify-between">
        <button
          @click="useRouter().back()"
          type="button"
          class="w-48 h-12 mt-5 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="w-48 h-12 mt-5 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </section>

  <section v-else class="p-24 flex flex-col items-center">
    <h1 class="uppercase text-2xl mb-2">the сart is empty</h1>
    <h2 class="text-xl mb-8">You can view the products on the main page or in the catalog</h2>
    <RouterLink to="/">
      <button
        class="border-solid border p-2 w-32 cursor-pointer duration-300 transition-all ease-in-out hover:border-accent"
      >
        to Home
      </button>
    </RouterLink>
  </section>
</template>
