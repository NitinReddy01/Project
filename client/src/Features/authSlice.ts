import { createSlice } from "@reduxjs/toolkit";

interface User{
    username:string,
    accessToken:string
}

const initialState:User={
    username:"",
    accessToken:""
}

const authSlice=createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            state.username=action.payload.username;
            state.accessToken=action.payload.accessToken;
        }
    }
})

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;