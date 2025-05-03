import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
export const useProductStore = defineStore('product', () => {
  const products = ref([])

  //Actions
  async function getProductsFromApi() {
    const response = await axios.get('https://fakestoreapi.com/products')
    products.value = response.data
  }

  return {
    products,
    getProductsFromApi,
  }
})
