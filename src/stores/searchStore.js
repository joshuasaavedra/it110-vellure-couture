import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './productStore'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')
  const searchHistory = ref([])
  const isSearching = ref(false)

  const productStore = useProductStore()

  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return []

    const query = searchQuery.value.toLowerCase().trim()

    return productStore.productsFromApi.filter((product) => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    })
  })

  function setSearchQuery(query) {
    searchQuery.value = query

    if (query.trim() && !searchHistory.value.includes(query.trim())) {
      searchHistory.value.unshift(query.trim())

      if (searchHistory.value.length > 10) {
        searchHistory.value.pop()
      }

      saveSearchHistory()
    }
  }

  function clearSearch() {
    searchQuery.value = ''
  }

  function clearSearchHistory() {
    searchHistory.value = []
    saveSearchHistory()
  }

  function saveSearchHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }

  function loadSearchHistory() {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      try {
        searchHistory.value = JSON.parse(saved)
      } catch (e) {
        console.error('Error loading search history:', e)
        searchHistory.value = []
      }
    }
  }

  loadSearchHistory()

  return {
    searchQuery,
    searchHistory,
    isSearching,
    searchResults,
    setSearchQuery,
    clearSearch,
    clearSearchHistory,
  }
})
