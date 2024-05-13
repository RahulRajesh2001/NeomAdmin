import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    baseProducts: [],
    productId:null
};



const baseProductsSlice = createSlice({
    name: "baseProducts",
    initialState,
    reducers: {
        setBaseProducts: (state, action) => {
            state.baseProducts = action.payload;
        },
        setBaseProductId:(state,action)=>{
            state.productId=action.payload
            console.log("hehe",state.productId)
        }
    }
});

export const { setBaseProductId,setBaseProducts } = baseProductsSlice.actions; 
export default baseProductsSlice.reducer;
