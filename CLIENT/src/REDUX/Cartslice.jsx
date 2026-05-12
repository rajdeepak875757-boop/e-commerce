import { createSlice } from '@reduxjs/toolkit'
import api from '../utils/api'

const initialState = {
  items: [],
  total: 0
}

const Cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || []
      state.total = action.payload.total || 0
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    }
  }
})

export const { setCart, clearCart } = Cartslice.actions

// Thunks
export const fetchCart = () => async (dispatch) => {
  try {
    const response = await api.get('/api/cart')
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error fetching cart:', error)
  }
}

export const addToCartAsync = (productId, quantity = 1) => async (dispatch) => {
  try {
    const response = await api.post('/api/cart', { productId, quantity })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

export const updateCartItemAsync = (productId, quantity) => async (dispatch) => {
  try {
    const response = await api.put(`/api/cart/${productId}`, { quantity })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

export const removeFromCartAsync = (productId) => async (dispatch) => {
  try {
    const response = await api.delete(`/api/cart/${productId}`)
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error removing from cart:', error)
  }
}

export default Cartslice.reducer