import { createSlice } from '@reduxjs/toolkit';

import
{
    SeedTable, DropTable, ClearTable, GetContact,
    AddContact, UpdateContact, DeleteContact
} from './database';


export const contactSlice = createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        SEED_TABLE: (state, action) => { },
        DROP_TABLE: (state, action) => { },
        CLEAR_TABLE: (state, action) => { },
        GET_CONTACT: (state, action) => { },
        ADD_CONTACT: (state, action) => { },
        UPDATE_CONTACT: (state, action) => { },
        DELETE_CONTACT: (state, action) => { },
    },
    extraReducers: {}
})

export const { SEED_TABLE, DROP_TABLE, CLEAR_TABLE, GET_CONTACT,
    ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } = contact.actions

export default contact.reducer