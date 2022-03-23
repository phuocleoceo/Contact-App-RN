import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './slices/contactSlice';

export const store = configureStore({
    reducer: {
        contact: contactSlice,
    },
});