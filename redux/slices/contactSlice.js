import { createSlice } from '@reduxjs/toolkit';

import
{
    SeedTable, DropTable, ClearTable, GetData,
    AddData, UpdateData, DeleteData
} from './database';


export const contactSlice = createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        SEED_CONTACT: (state, action) =>
        {
            SeedTable();
            return state;
        },
        DROP_CONTACT: (state, action) =>
        {
            DropTable();
            return state;
        },
        CLEAR_CONTACT: (state, action) =>
        {
            ClearTable();
            return state;
        },
        GET_CONTACT: (state, action) =>
        {
            return GetData();
        },
        ADD_CONTACT: (state, action) =>
        {
            const { name, phone, email, img } = action.payload;
            return AddData(name, phone, email, img);
        },
        UPDATE_CONTACT: (state, action) =>
        {
            const { id, name, phone, email, img } = action.payload;
            return UpdateData(id, name, phone, email, img);
        },
        DELETE_CONTACT: (state, action) =>
        {
            const { id } = action.payload;
            return DeleteData(id);
        },
    },
    extraReducers: {}
});

export const { SEED_CONTACT, DROP_CONTACT, CLEAR_CONTACT, GET_CONTACT,
    ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } = contact.actions;

export default contact.reducer;