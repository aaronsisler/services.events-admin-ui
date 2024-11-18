// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, USER_ID, USERS_PATH } from "@/app/constants";
import { User } from "@/app/user/user";

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "usersApi",
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => `${USERS_PATH}/${USER_ID}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
