import { createSlice } from '@reduxjs/toolkit';


export const contactSlice = createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        SET_CONTACT: (state, action) =>
        {
            return action.payload;
        }
    },
    extraReducers: {}
});

export const { SET_CONTACT } = contactSlice.actions;

export default contactSlice.reducer;