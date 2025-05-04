import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { supabase } from '@/utils/supabase'

export const useProductStore = defineStore('product', () => {
  const productsFromApi = ref([])
  const products = ref([])
  const categoriesFromApi = ref([])
  const categories = ref([])

  function $reset() {
    productsFromApi.value = []
    products.value = []
    categoriesFromApi.value = []
    categories.value = []
  }

  //Actions
  //retrieve categories from api and insert to supabase table
  async function getCategoriesFromApi() {
    try {
      // Fetch categories directly from categories endpoint
      const response = await axios.get('https://fakestoreapi.com/products/categories')
      categoriesFromApi.value = response.data

      // Get existing categories from Supabase
      const { data: existingCategories } = await supabase.from('categories').select('name')

      // Find categories not yet in the database
      const newCategories = categoriesFromApi.value.filter(
        (category) => !existingCategories.some((ec) => ec.name === category),
      )

      // Insert new categories
      if (newCategories.length > 0) {
        const { data, error } = await supabase
          .from('categories')
          .insert(newCategories.map((name) => ({ name })))
          .select()

        if (error) {
          console.error('Error inserting categories:', error)
        } else {
          console.log('New categories inserted:', data)
        }
      }

      return categoriesFromApi.value
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  //retrieve products from api and insert to supabase table
  async function getProductsFromApi() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      productsFromApi.value = response.data

      // Extract unique categories from the API response
      const uniqueCategories = [
        ...new Set(productsFromApi.value.map((product) => product.category)),
      ]

      // Get existing categories from Supabase
      const { data: existingCategories } = await supabase.from('categories').select('id, name')

      // Create a mapping of category names to IDs for existing categories
      const categoryMap = {}
      existingCategories.forEach((category) => {
        categoryMap[category.name] = category.id
      })

      // Find categories not yet in the database
      const newCategories = uniqueCategories.filter(
        (category) => !existingCategories.some((ec) => ec.name === category),
      )

      // Insert new categories
      if (newCategories.length > 0) {
        const { data: newCategoriesData, error } = await supabase
          .from('categories')
          .insert(
            newCategories.map((name) => ({
              name,
              created_at: new Date().toISOString(),
            })),
          )
          .select('id, name')

        if (error) {
          console.error('Error inserting categories:', error)
          return
        }

        // Add new categories to the mapping
        if (newCategoriesData) {
          newCategoriesData.forEach((category) => {
            categoryMap[category.name] = category.id
          })
        }
      }

      // Transform product data with correct category IDs
      const transformedData = productsFromApi.value.map((product) => {
        return {
          name: product.title,
          description: product.description,
          price: product.price,
          stock: null,
          category_id: categoryMap[product.category],
        }
      })

      // Insert products
      const { data, error } = await supabase.from('products').insert(transformedData).select()

      if (error) {
        console.error('Error inserting products:', error)
        return
      }

      console.log('Products inserted successfully:', data)
    } catch (error) {
      console.error('Error in getProductsFromApi:', error)
    }
  }

  async function getProducts() {
    const { data } = await supabase.from('products').select('*')

    products.value = data
  }

  return {
    productsFromApi,
    getProductsFromApi,
    getProducts,
    products,
    categoriesFromApi,
    getCategoriesFromApi,
    $reset,
    categories,
  }
})
