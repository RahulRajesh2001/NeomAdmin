import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offers: [],
    offerId:null
};

const offersSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        setOffers: (state, action) => {
            state.offers = action.payload;
        },
        setOfferId:(state,action)=>{
            state.offerId=action.payload
        }
    }
});

export const { setOffers,setOfferId } = offersSlice.actions; 
export default offersSlice.reducer;
