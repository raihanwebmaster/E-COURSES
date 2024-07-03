import {createSlice} from '@reduxjs/toolkit';

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
export default authSlice.reducer;