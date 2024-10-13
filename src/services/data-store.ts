import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { deleteToken, getToken, setToken } from '@/utils/cookie'

interface Product {
  id: string
  name: string
  brand: string
  price: string
  imgFirst: string
  imgSecond: string
  year: string
  information: string
  sale: string
  size?: string
  concave?: string
  rigidity?: string
  count: number
  category: string
}

interface User {
  id?: string
  first?: string
  second?: string
  email?: string
  password?: string
  address?: string
  phone?: string
}

interface orderData {
  first: string
  second: string
  email: string
  phone: string
  address: string
  products: Product[]
}

interface filterType {
  category?: string
  brand?: string
  size?: string
  concave?: string
  rigidity?: string
  by?: string
}

interface DataStoreState {
  data: Product[] | null
  product: Product | null
  products: Product[] | null
  filterValues: filterValuesType | null
  filter: filterType
  user: User | null
  cart: Product[]
  loading: boolean
  error: string | null
}

interface filterValuesType {
  brand: string[]
  size: string[]
  concave: string[]
  rigidity: string[]
}

export const useDataStore = defineStore('dataStore', {
  state: (): DataStoreState => ({
    data: null,
    product: null,
    products: null,
    filterValues: null,
    filter: {
      category: '',
      brand: '',
      size: '',
      concave: '',
      rigidity: '',
      by: ''
    },
    user: null,
    cart: [],
    loading: false,
    error: null
  }),
  getters: {},
  actions: {
    async fetchData(filter: filterType) {
      this.loading = true
      this.error = null
      try {
        let url = `https://7f538bc53976426c.mokky.dev/products`
        let urlForBrands = 'https://7f538bc53976426c.mokky.dev/products'

        let isFirstFilter = true

        if (filter.category) {
          url += `${isFirstFilter ? '?' : '&'}category=${filter.category}`
          urlForBrands += `?category=${filter.category}`
          isFirstFilter = false
        }

        if (filter.brand) {
          url += `${isFirstFilter ? '?' : '&'}brand=${filter.brand}`
          isFirstFilter = false
        }

        if (filter.size) {
          url += `${isFirstFilter ? '?' : '&'}size=${filter.size}`
          isFirstFilter = false
        }

        if (filter.concave) {
          url += `${isFirstFilter ? '?' : '&'}concave=${filter.concave}`
          isFirstFilter = false
        }

        if (filter.rigidity) {
          url += `${isFirstFilter ? '?' : '&'}rigidity=${filter.rigidity}`
          isFirstFilter = false
        }

        if (filter.by) {
          url += `${isFirstFilter ? '?' : '&'}sortBy=${filter.by === '+' ? '' : '-'}price`
          isFirstFilter = false
        }

        const response = await axios.get(url)
        const res = await axios.get(urlForBrands)
        this.data = response.data

        const obj = res.data.map((prod: Product) => ({
          brand: prod.brand.toLowerCase(),
          size: prod.size,
          concave: prod.concave,
          rigidity: prod.rigidity
        }))

        const uniqueAttributes: filterValuesType = {
          brand: [],
          size: [],
          concave: [],
          rigidity: []
        }

        obj.forEach((item: { brand: string; size: string; concave: string; rigidity: string }) => {
          if (!uniqueAttributes.brand.includes(item.brand)) {
            uniqueAttributes.brand.push(item.brand)
          }
          if (!uniqueAttributes.size.includes(item.size)) {
            uniqueAttributes.size.push(item.size)
          }
          if (!uniqueAttributes.concave.includes(item.concave)) {
            uniqueAttributes.concave.push(item.concave)
          }
          if (!uniqueAttributes.rigidity.includes(item.rigidity)) {
            uniqueAttributes.rigidity.push(item.rigidity)
          }
        })

        this.filterValues = uniqueAttributes
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
    async changeFilter(filter: filterType | null) {
      this.error = null
      try {
        filter
          ? (this.filter = filter)
          : (this.filter = {
              category: this.filter.category,
              brand: '',
              size: '',
              concave: '',
              rigidity: '',
              by: ''
            })
      } catch (err) {
        this.error = String(err)
      }
    },
    async loginUser({ email, password }: { email: string; password: string }) {
      this.error = null
      try {
        const response = await axios.post('https://7f538bc53976426c.mokky.dev/auth', {
          email: email,
          password: password
        })
        this.user = response.data.data
        setToken(response.data.token)
      } catch (err) {
        this.error = String(err)
      }
    },
    async logoutUser() {
      this.error = null
      try {
        this.user = null
        deleteToken()
      } catch (err) {
        this.error = String(err)
      }
    },
    async deleteUser(id: string) {
      this.error = null
      try {
        await axios.delete(`https://7f538bc53976426c.mokky.dev/users/${id}`)
        this.user = null
        deleteToken()
      } catch (err) {
        this.error = String(err)
      }
    },
    async registrationUser(data: User) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`https://7f538bc53976426c.mokky.dev/register`, data)
        this.user = response.data
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
    async patchUser(data: User) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.patch(
          `https://7f538bc53976426c.mokky.dev/users/${data.id}`,
          data
        )
        this.user = response.data
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
    async fetchUser() {
      this.error = null
      try {
        const response = await axios.get('https://7f538bc53976426c.mokky.dev/auth_me', {
          headers: {
            Authorization: 'Bearer ' + getToken()
          }
        })
        this.user = response.data
      } catch (err) {
        deleteToken()
        this.error = String(err)
      }
    },
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`https://7f538bc53976426c.mokky.dev/products`)
        this.products = response.data
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
    async findProduct(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`https://7f538bc53976426c.mokky.dev/products/${id}`)
        this.product = response.data
        if (this.product) {
          await axios.patch(`https://7f538bc53976426c.mokky.dev/products/${id}`, {
            count: this.product.count + 1
          })
        }
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
    async postCart(id: string, isMore: string) {
      this.error = null
      try {
        if (this.product) {
          const existingProduct = this.cart.find((prod) => prod.id === id)

          if (existingProduct) {
            existingProduct.count += isMore ? 1 : -1
            if (existingProduct.count === 0) {
              this.cart = this.cart.filter((product) => product.id != id)
            }
          } else {
            this.cart.push({ ...this.product, count: 1 })
          }
        }
      } catch (err) {
        this.error = String(err)
      }
    },
    async deleteCart(id: string) {
      this.error = null
      try {
        this.cart = this.cart.filter((product) => product.id != id)
      } catch (err) {
        this.error = String(err)
      }
    },
    async postOrder(order: orderData) {
      this.loading = true
      this.error = null
      try {
        await axios.post(`https://7f538bc53976426c.mokky.dev/cart`, order)
        this.cart = []
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    }
  }
})
