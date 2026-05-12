import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    items:[],
    total:0
}

const Cartslice = createSlice({
    name:'cart',
    initialState,
    reducers:{
     setCart:(state,action)=>{
        state.items = action.payload.items || []
        state.total = action.payload.total || 0
     },
     addtocart:(state,action)=>{
       const item = state.items.find(item => item.productId === action.payload.productId)
       if(item){
         item.quantity += action.payload.quantity
       }else{
        state.items.push(action.payload)
       }
       state.total = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
     },
     removeFromCart:(state,action)=>{
        state.items = state.items.filter(item => item.productId !== action.payload)
        state.total = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
     },
     updateQuantity:(state,action)=>{
       const item = state.items.find(item => item.productId === action.payload.productId)
       if(item){
         item.quantity = action.payload.quantity
       }
       state.total = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
     },
     clearCart:(state)=>{
        state.items = []
        state.total = 0
     }
    }
})

export const {setCart,addtocart,removeFromCart,updateQuantity,clearCart} = Cartslice.actions

// Thunks
export const fetchCart = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error fetching cart:', error)
  }
}

export const addToCartAsync = (productId, quantity) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:8000/api/cart', { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

export const updateCartItemAsync = (productId, quantity) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(`http://localhost:8000/api/cart/${productId}`, { quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

export const removeFromCartAsync = (productId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`http://localhost:8000/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(setCart(response.data))
  } catch (error) {
    console.error('Error removing from cart:', error)
  }
}

export default Cartslice.reducer