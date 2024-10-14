<script setup>
import { ref } from 'vue'

const props = defineProps({
  path: String,
  handleSumbitFunction: Function,
  handleChangePath: Function
})

const formData = ref({
  first: '',
  second: '',
  email: '',
  password: ''
})

const localErrors = ref({})

const validateNames = (str) => {
  return str.trim().length >= 2 ? '' : 'Must be at least 2 characters'
}

const validatePassword = (str) => {
  return str.trim().length >= 6 ? '' : 'Must be at least 6 characters'
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) ? '' : 'Invalid email address'
}

const handleFirstNameChange = (e) => {
  const newName = e.target.value
  formData.value.first = newName
  localErrors.value.first = validateNames(newName)
}

const handleSecondNameChange = (e) => {
  const newName = e.target.value
  formData.value.second = newName
  localErrors.value.second = validateNames(newName)
}

const handleEmailChange = (e) => {
  const newEmail = e.target.value
  formData.value.email = newEmail
  localErrors.value.email = validateEmail(newEmail)
}

const handlePasswordChange = (e) => {
  const newPassword = e.target.value
  formData.value.password = newPassword
  localErrors.value.password = validatePassword(newPassword)
}

const handleSubmit = () => {
  if (props.path === 'registration') {
    validateNames(formData.value.first)
    validateNames(formData.value.second)
  }
  validateEmail(formData.value.email)
  validatePassword(formData.value.password)

  if (
    !localErrors.value.first &&
    !localErrors.value.second &&
    !localErrors.value.email &&
    !localErrors.value.password
  ) {
    props.handleSumbitFunction(formData.value)
  }
}
</script>

<template>
  <section class="px-24 pb-24 pt-8 min-h-[100vh]">
    <h1 class="text-center text-5xl font-[Christmas]">
      {{ path[0].toUpperCase() + path.slice(1) }}
    </h1>
    <form class="mt-5" v-auto-animate @submit.prevent="handleSubmit">
      <div v-if="props.path === 'registration'">
        <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">First-Name</label>
        <input
          class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
          type="text"
          id="first"
          placeholder="Tong"
          @input="handleFirstNameChange"
          :value="formData.first"
        />
        <span class="text-sm text-accent" v-if="localErrors.first">{{ localErrors.first }}</span>

        <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Second-Name</label>
        <input
          class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
          type="text"
          id="second"
          placeholder="Btlushka"
          @input="handleSecondNameChange"
          :value="formData.second"
        />
        <span class="text-sm text-accent" v-if="localErrors.second">{{ localErrors.second }}</span>
      </div>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Email</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="email"
        id="email"
        placeholder="tongtong@gmail.com"
        @input="handleEmailChange"
        :value="formData.email"
      />
      <span class="text-sm text-accent" v-if="localErrors.email">{{ localErrors.email }}</span>

      <label class="block text-lg mt-5 font-medium text-gray-700 mb-2">Password</label>
      <input
        class="block w-full p-2 mb-1 border border-textcl shadow-sm focus:outline-none hover:border-accent focus:border-accent bg-inherit focus:animate-shadow duration-300 transition-all ease-in-out"
        type="password"
        id="password"
        @input="handlePasswordChange"
        :value="formData.password"
      />
      <span class="text-sm text-accent" v-if="localErrors.password">{{
        localErrors.password
      }}</span>

      <div class="flex justify-between mt-5 items-start">
        <span
          @click="handleChangePath"
          class="cursor-pointer text-sm hover:text-accent duration-300 transition-all ease-in-out"
        >
          {{ props.path === 'registration' ? 'Do you have an account?' : 'Register' }}
        </span>
        <button
          type="submit"
          class="w-48 h-12 text-xl border-solid border-textcl border hover:border-accent duration-300 transition-all ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
</template>
