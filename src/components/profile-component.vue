<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const modalOpen = ref(false)

const props = defineProps({
  user: Object,
  handleSumbitFunction: Function,
  handleLogout: Function,
  handleDelete: Function
})

const userData = ref({
  id: props.user.id,
  first: props.user.first,
  second: props.user.second,
  email: props.user.email,
  phone: props.user.phone,
  address: props.user.address,
  password: props.user.password
})

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
  if (newPhone !== undefined)
    return phonePattern.test(newPhone) || newPhone.trim().length == 0
      ? ''
      : 'Please enter a valid phone number'
}

const handleFirstNameChange = (e) => {
  const newName = e.target.value
  userData.value.first = newName
  localErrors.value.first = validateNames(newName)
}

const validatePassword = (str) => {
  if (str !== undefined)
    return str.trim().length >= 6 || str.trim().length == 0 ? '' : 'Must be at least 6 characters'
}

const handleSecondNameChange = (e) => {
  const newName = e.target.value
  userData.value.second = newName
  localErrors.value.second = validateNames(newName)
}

const handleEmailChange = (e) => {
  const newEmail = e.target.value
  userData.value.email = newEmail
  localErrors.value.email = validateEmail(newEmail)
}

const handlePhoneChange = (e) => {
  const newPhone = e.target.value
  userData.value.phone = newPhone
  localErrors.value.phone = validatePhone(newPhone)
}

const handleAddressChange = (e) => {
  userData.value.address = e.target.value
}

const handlePasswordChange = (e) => {
  const newPassword = e.target.value
  userData.value.password = newPassword
  localErrors.value.password = validatePassword(newPassword)
}

const handleSubmit = () => {
  validateNames(userData.value.first)
  validateNames(userData.value.second)
  validateEmail(userData.value.email)
  validatePhone(userData.value.phone)
  validatePassword(userData.value.password)

  if (
    !localErrors.value.first &&
    !localErrors.value.second &&
    !localErrors.value.email &&
    !localErrors.value.phone &&
    !localErrors.value.password
  ) {
    props.handleSumbitFunction(userData)
  }
}

const openModal = () => {
  modalOpen.value = !modalOpen.value
  document.body.style.overflow = modalOpen.value ? 'hidden' : ''
  window.scroll(0, 0)
}
</script>

<template>
  <div
    class="absolute flex bg-black/[0.6] justify-center items-start fixed right-0 bottom-0 z-10 top-0 left-0"
    v-if="modalOpen"
    v-auto-animate
  >
    <div
      class="flex flex-col gap-5 p-5 text-center w-[60%] h-[50%] mt-[10%] bg-defaultbg border-solid border-[1px] border-accent animate-shadow"
    >
      <h2 class="text-5xl font-[Christmas] animate-pulse text-accent">Are you sure?</h2>
      <h3 class="text-xl">Will be impossible to restore the account</h3>
      <div class="flex justify-around mt-20">
        <button
          type="button"
          @click="openModal"
          class="w-48 h-12 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
        >
          Cancel
        </button>
        <button
          @click="props.handleDelete"
          type="button"
          class="w-48 h-12 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  </div>

  <section class="px-24 py-5 relative">
    <h1 class="text-center font-[Christmas] text-5xl mb-5">Prrofile</h1>
    <form class="mt-5" v-auto-animate @submit.prevent="handleSubmit">
      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">First-Name</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="text"
        id="first"
        placeholder="Tong"
        @input="handleFirstNameChange"
        :value="userData.first"
      />
      <span class="text-sm text-accent" v-if="localErrors.first">{{ localErrors.first }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Second-Name</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="text"
        id="second"
        placeholder="Btlushka"
        @input="handleSecondNameChange"
        :value="userData.second"
      />
      <span class="text-sm text-accent" v-if="localErrors.second">{{ localErrors.second }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Tel</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="tel"
        id="phone"
        placeholder="+7 495 325 45 22"
        :value="userData.phone"
        @input="handlePhoneChange"
      />
      <span class="text-sm text-accent" v-if="localErrors.phone">{{ localErrors.phone }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Email</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="email"
        id="email"
        placeholder="tngtng@gmail.com"
        :value="userData.email"
        @input="handleEmailChange"
      />
      <span class="text-sm text-accent" v-if="localErrors.email">{{ localErrors.email }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Address</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="address"
        placeholder="Moscow, Bekhtereva, 15"
        :value="userData.address"
        @input="handleAddressChange"
      />

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Password</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="password"
        placeholder="**********"
        :value="userData.password"
        @input="handlePasswordChange"
      />
      <span class="text-sm text-accent" v-if="localErrors.password">{{
        localErrors.password
      }}</span>

      <div class="my-5 gap-3 flex flex-col items-start">
        <button
          @click="openModal"
          type="button"
          class="text-sm hover:text-accent duration-300 transition-all ease-in-out"
        >
          Delete account?
        </button>

        <button
          @click="props.handleLogout"
          type="button"
          class="text-sm hover:text-accent duration-300 transition-all ease-in-out"
        >
          Log out?
        </button>
      </div>

      <div class="flex justify-between my-5">
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
</template>
