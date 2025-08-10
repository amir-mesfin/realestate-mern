import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
   currentUser:null,
   error:null,
   loading:false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
       signInStart: (state)=>{
        state.loading= true;
       },
       signInSuccess: (state,action)=>{
        state.currentUser = action.payload;
        state.loading=false;
        state.error=null;
       },
       signInFailure:(state, action)=>{
        state.error=action.payload;
        state.loading=false;
       },
       updateUserStart:(state)=>{
        state.loading = true
       },
       updateSuccess:(state,action)=>{
        state.currentUser = action.payload;
        state.loading=false;
        state.error=null;
       },
       updateFailure:(state,action)=>{
        state.error= action.payload;
        state.loading=false;
       },
       deleteUserStart:(state)=>{
        state.loading=true;
       },
       deleteUserSuccess:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null;
       },
       deleteUSerFailure:(state,action)=>{
        state.error = action.payload;
        state.loading=false;
        
       },
       
       signOutUserStart:(state)=>{
        state.loading=true;
       },
       signOutUserSuccess:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null;
       },
       signOutUSerFailure:(state,action)=>{
        state.error = action.payload;
        state.loading=false;
        
       }

  },
})

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateFailure,
  updateSuccess,
  updateUserStart,
  deleteUSerFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUSerFailure, } = userSlice.actions;

export default userSlice.reducer;