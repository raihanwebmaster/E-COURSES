import {createSlice} from '@reduxjs/toolkit';
import { use } from 'react';

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = null;
            state.user = null;
        }
    },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;