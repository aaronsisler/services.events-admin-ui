// Need to use the React-specific entry point to import `createApi`
import { createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  clientId: string;
}

const commonInititalState: CommonState = {
  clientId: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState: commonInititalState,
  reducers: {
    setClientId(state, action) {
      return { ...state, clientId: action.payload };
    },
    clearClientId(state) {
      return { ...state, clientId: "" };
    },
  },
  selectors: {
    getClientId: (state) => state.clientId,
  },
});

export const { clearClientId, setClientId } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;

export const { getClientId } = commonSlice.selectors;
