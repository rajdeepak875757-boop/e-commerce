import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    product:[],
    loader:false,
    error:null
}

const Productslice = createSlice({
    name:'product',
    initialState,
    reducers:{
        productstart:(state)=>{
            state.loader=true
        },
        productsuccess:(state,action)=>{
            state.loader=false,
            state.product = action.payload
        },
        productfalse:(state,action)=>{
            state.loader = false
            state.product = action.error
        }
    }

})

export const {productstart,productsuccess,productfalse} = Productslice.actions
export default Productslice.reducer