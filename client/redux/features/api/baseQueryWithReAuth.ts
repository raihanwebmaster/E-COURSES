import { fetchBaseQuery, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { userLoggedIn } from '../auth/authSlice';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // Fetch user details after refreshing the token
          const userResult = await baseQuery('/user/me', api, extraOptions);
          if (userResult.data) {
            api.dispatch(userLoggedIn({
              user: (userResult.data as { data: { user: any } }).data.user,
              token: newAccessToken,
            }));
          }

          result = await baseQuery(args, api, extraOptions);
        } else {
          return refreshResult;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default baseQueryWithReauth;
