import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import vecationModel from "../Models/VecationModel";



interface vecationSlice{
    vecations:vecationModel[]
}

const initialState:vecationSlice = {
    vecations:[]
}

export const VecationSlice = createSlice({

    name:"vecations",
    initialState,
    reducers:{

        fetchVecations:(state, action:PayloadAction<vecationModel[]>) =>{
            
            
            state.vecations = action.payload;
        },

        addVecation:(state, action:PayloadAction<vecationModel>) =>{

            state.vecations.push(action.payload);
        },
        
        updateVecation:(state, action:PayloadAction<vecationModel>) => {

            const index = state.vecations.findIndex(v => v.id===action.payload.id);
            if(index >= 0 ){
                state.vecations[index] = action.payload;
            }
        },

        deleteVecation:(state, action:PayloadAction<number>) => {

            
            const index = state.vecations.findIndex(v => v.id === action.payload);
            if(index >= 0 ){
                
                state.vecations.splice(index,1);
            }
        },
        DeleteAllVecations:(state) => {
            
                state.vecations = []
            
        },
        

    }
})

export const  {fetchVecations ,addVecation ,updateVecation,deleteVecation,DeleteAllVecations} = VecationSlice.actions
export default VecationSlice.reducer