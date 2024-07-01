import { jwtDecode } from "jwt-decode";
import userModel from "../Models/userModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSlice{
    user:userModel
    token:string
    
}

const initialState:UserSlice = {

    user:null,
    token:sessionStorage.getItem("token"),
    
}

if(initialState.token){
    const container:{user:userModel} = jwtDecode(initialState.token)
    initialState.user = container.user
}

export const userSlice = createSlice({

    name:"user",
    initialState,
    reducers:{

        register:(state, action:PayloadAction<string>) => {

            const container:{user:userModel} = jwtDecode(action.payload);

            sessionStorage.setItem("token",action.payload)

            state.token = action.payload;
            state.user = container.user;
            
            
        },
        
        login:(state, action:PayloadAction<string>) => {

            const container:{user:userModel} = jwtDecode(action.payload);

            sessionStorage.setItem("token",action.payload)

            state.token = action.payload;
            state.user = container.user;
        
            
        },
        

        logout:(state) => {


            state.token = null;
            state.user = null;
          

            sessionStorage.removeItem("token");
            
        }
    }
});

export const {register, login, logout} = userSlice.actions;
export default userSlice.reducer;