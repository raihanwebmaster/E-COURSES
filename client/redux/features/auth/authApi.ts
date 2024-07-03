import { apiSlice } from "../api/appSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
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
                        token: result.data.activationToken,
                    }));
                } catch (error) {
                    console.error(error);
                }
             }
        }),
        activate: builder.mutation<RegistrationResponse, ActivationData>({
            query: ({activation_token, activation_code}) => ({
                url: '/auth/activate',
                method: 'POST',
                body: {activation_token, activation_code},
                credentials: 'include' as const,
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivateMutation } = authApi;