import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, USER_ID, USERS_PATH } from "@/app/constants";
import { User } from "@/app/user/user";
import { setClientId } from "../common/common-slice";

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  reducerPath: "user",
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => `${USERS_PATH}/${USER_ID}`,
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data: user } = await queryFulfilled;
        if (user?.clientIds?.[0]) {
          dispatch(setClientId(user?.clientIds?.[0]));
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
