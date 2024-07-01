import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import  VecationSlice  from "./vecationSlice";


export const store = configureStore({

    reducer:{
        
        user:userSlice,

        vecation:VecationSlice

    }
});
export type RootState = ReturnType<typeof store.getState>