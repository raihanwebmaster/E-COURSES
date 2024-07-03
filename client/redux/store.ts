'use client'

import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './features/api/appSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production', 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});