import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { clientApiSlice } from "@/lib/features/client/client-api-slice";
import { commonSlice } from "@/lib/features/common/common-slice";
import { eventApiSlice } from "@/lib/features/event/event-api-slice";
import { eventScheduleApiSlice } from "@/lib/features/event-schedule/event-schedule-api-slice";
import { eventScheduleSlice } from "@/lib/features/event-schedule/event-schedule-slice";
import { locationApiSlice } from "@/lib/features/location/location-api-slice";
import { organizerApiSlice } from "@/lib/features/organizer/organizer-api-slice";
import { scheduledEventApiSlice } from "@/lib/features/scheduled-event/scheduled-event-api-slice";
import { userApiSlice } from "@/lib/features/user/user-api-slice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  clientApiSlice,
  commonSlice,
  eventApiSlice,
  eventScheduleApiSlice,
  eventScheduleSlice,
  locationApiSlice,
  scheduledEventApiSlice,
  organizerApiSlice,
  userApiSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(clientApiSlice.middleware)
        .concat(eventApiSlice.middleware)
        .concat(eventScheduleApiSlice.middleware)
        .concat(locationApiSlice.middleware)
        .concat(organizerApiSlice.middleware)
        .concat(scheduledEventApiSlice.middleware)
        .concat(userApiSlice.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
