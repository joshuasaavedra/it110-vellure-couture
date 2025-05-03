import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

export const useCartStore = defineStore('cart', () => {
  // Load initial cart items from localStorage if available
  const savedCart = localStorage.getItem('vellureCart')
  const initialCartItems = savedCart ? JSON.parse(savedCart) : []
  
  // State
  const cartItems = ref(initialCartItems)
  const isProcessingOrder = ref(false)
  const orderStatus = ref(null) // 'success', 'error', null
  const orderError = ref(null)
  const currentOrderId = ref(null)

  // Getters
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Actions
  // Save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('vellureCart', JSON.stringify(cartItems.value))
  }
  
  function addToCart(product) {
    const existingItem = cartItems.value.find((item) => item.id === product.id)

    if (existingItem) {
      // If item already exists in cart, increase quantity
      existingItem.quantity++
    } else {
      // Otherwise add new item to cart
      cartItems.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
    
    // Save to localStorage after adding
    saveCartToLocalStorage()
  }

  function removeFromCart(productId) {
    const index = cartItems.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
      saveCartToLocalStorage()
    }
  }

  function updateQuantity(productId, quantity) {
    const item = cartItems.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
      // Remove item if quantity is 0 or less
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        saveCartToLocalStorage()
      }
    }
  }

  function clearCart() {
    cartItems.value = []
    orderStatus.value = null
    orderError.value = null
    currentOrderId.value = null
    saveCartToLocalStorage()
  }

  // Supabase integration functions
  async function createOrder() {
    const authStore = useAuthUserStore()
    isProcessingOrder.value = true
    orderStatus.value = null
    orderError.value = null

    try {
      // Check if user is authenticated
      const isAuthenticated = await authStore.isAuthenticated()
      if (!isAuthenticated) {
        throw new Error('You must be logged in to place an order')
      }

      // Calculate total price
      const total = totalPrice.value

      // First, ensure all products in the cart exist in the products table
      for (const item of cartItems.value) {
        // Check if product exists in the database
        const { data: existingProducts, error: queryError } = await supabase
          .from('products')
          .select('id')
          .eq('id', item.id)

        if (queryError) {
          console.error('Error querying product:', queryError)
          throw new Error(`Failed to query product: ${queryError.message}`)
        }

        // If product doesn't exist, insert it
        if (!existingProducts || existingProducts.length === 0) {
          const { error: productError } = await supabase.from('products').insert({
            id: item.id,
            name: item.title,
            description: item.description || '',
            price: item.price,
            stock: 100, // Default stock value
            category_id: 1, // Default category ID
          })

          if (productError) {
            console.error('Error inserting product:', productError)
            throw new Error(`Failed to create product: ${productError.message}`)
          }
        }
      }

      // Insert order into orders table
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: authStore.userData.id,
          total_price: total,
          order_status: 'pending',
        })
        .select()

      if (orderError) throw orderError

      // Get the inserted order ID
      const orderId = orderData[0].id
      currentOrderId.value = orderId

      // Insert order items
      const orderItems = cartItems.value.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

      if (itemsError) throw itemsError

      orderStatus.value = 'success'
      return { success: true, orderId }
    } catch (error) {
      console.error('Error creating order:', error)
      orderStatus.value = 'error'
      orderError.value = error.message
      return { success: false, error: error.message }
    } finally {
      isProcessingOrder.value = false
    }
  }

  async function processPayment(paymentDetails) {
    try {
      if (!currentOrderId.value) {
        throw new Error('No active order to process payment for')
      }

      // Insert payment record
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: currentOrderId.value,
          payment_method: paymentDetails.method,
          payment_status: 'completed',
        })
        .select()

      if (paymentError) throw paymentError

      // Update order status to completed
      const { error: updateError } = await supabase
        .from('orders')
        .update({ order_status: 'completed' })
        .eq('id', currentOrderId.value)

      if (updateError) throw updateError

      // Clear cart after successful payment
      clearCart()

      return { success: true, paymentId: paymentData[0].id }
    } catch (error) {
      console.error('Error processing payment:', error)
      return { success: false, error: error.message }
    }
  }

  async function getOrderHistory() {
    const authStore = useAuthUserStore()
    try {
      // Check if user is authenticated
      const isAuthenticated = await authStore.isAuthenticated()
      if (!isAuthenticated) {
        throw new Error('You must be logged in to view order history')
      }

      // Get all orders for the current user
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(
          `
          id,
          created_at,
          total_price,
          order_status,
          order_items (id, product_id, quantity, price)
        `,
        )
        .eq('user_id', authStore.userData.id)
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      return { success: true, orders }
    } catch (error) {
      console.error('Error fetching order history:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    isProcessingOrder,
    orderStatus,
    orderError,
    currentOrderId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder,
    processPayment,
    getOrderHistory,
  }
})
