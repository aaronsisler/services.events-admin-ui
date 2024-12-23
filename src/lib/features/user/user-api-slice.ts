import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, USER_ID, USERS_PATH } from "@/lib/constants";
import { setClientId } from "@/lib/features/common/common-slice";
import { User } from "@/lib/features/user/user";

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/` }),
  reducerPath: "userApi",
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
