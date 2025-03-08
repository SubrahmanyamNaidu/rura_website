import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    payload: {},
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
      updateUser:(state,action)=>{
          state.payload=action.payload
      },
  },
})

export const { updateUser} = userSlice.actions

export default userSlice.reducer
  

