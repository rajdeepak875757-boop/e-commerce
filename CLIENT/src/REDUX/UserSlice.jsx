import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false
}

const Userslice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setuser:(state,action)=>{
       state.user = action.payload.user
       state.token = action.payload.token
       state.isAuthenticated = true
        },
        clearuser:(state)=>{
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        }
        
    }
})
export const {setuser,clearuser} = Userslice.actions
export default Userslice.reducer