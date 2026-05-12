import {configureStore} from '@reduxjs/toolkit'
import userslice from './UserSlice'
import productslice from './Productslice'
import cartslice from './Cartslice'

export const store = configureStore({
    reducer:{
        user:userslice,
        product:productslice,
        cart:cartslice
    }
})