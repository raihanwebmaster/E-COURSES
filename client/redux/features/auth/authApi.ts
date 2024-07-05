import { apiSlice } from "../api/appSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    success: boolean;
    message: string;
    data: {
        activationToken: string;
    }
}

type RegistrationData = {
    name: string;
    email: string;
    password: string;
}

type ActivationData = {
    activation_token: string;
    activation_code: string;
}

type LoginData = {
    email: string;
    password: string;
}

type SocialAuthData = {
    name: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    
    };
}

type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        user: {
            avatar: {
                public_id: string;
                url: string;
            };
            _id: string;
            name: string;
            email: string;
            needsPasswordChange: boolean;
            role: string;
            status: string;
            isVerified: boolean;
            isDeleted: boolean;
            courses: Array<{
                courseId: string;
            }>;
            createdAt: string;
            updatedAt: string;
            __v: number;
            passwordChangedAt: string;
        };
        accessToken: string;
    };
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data,
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({
                        token: result.data.data.activationToken,
                    }));
                } catch (error) {
                    console.error(error);
                }
             }
        }),
        activate: builder.mutation<any, ActivationData>({
            query: ({activation_token, activation_code}) => ({
                url: '/auth/activation',
                method: 'POST',
                body: {activation_token, activation_code},
                credentials: 'include' as const,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginData>({
            query: ({ email, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { email, password },
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        user: result.data.data.user,
                        token: result.data.data.accessToken,
                    }));
                } catch (error) {
                    console.error(error);
                }
             }
        }),
        socialAuth: builder.mutation<LoginResponse, SocialAuthData>({
            query: ({ email, name, avatar }) => ({
                url: '/auth/social',
                method: 'POST',
                body: { email, name, avatar, password: "Raihan8125@"},
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        user: result.data.data.user,
                        token: result.data.data.accessToken,
                    }));
                } catch (error) {
                    console.error(error);
                }
             }
        }),
        logOut: builder.mutation<any, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { 
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error(error);
                }
             }
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivateMutation, useLoginMutation, useSocialAuthMutation, useLogOutMutation, useChangePasswordMutation } = authApi;