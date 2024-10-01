import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState:{
        searchQuery:"",
        allAccounts:[],
    },
    reducers:{
        setSearchedQuery : (state,action)=>{
            state.searchQuery = action.payload
        },
        setAllAccounts : (state,action)=>{
            state.allAccounts = action.payload
        }
    }
});

export const {setSearchedQuery,setAllAccounts} = accountSlice.actions;
export default accountSlice.reducer;
