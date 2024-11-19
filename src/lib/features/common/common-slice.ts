// Need to use the React-specific entry point to import `createApi`
import { createSlice } from "@reduxjs/toolkit";

interface commonState {
  clientId: string;
}

const commonInititalState: commonState = {
  clientId: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState: commonInititalState,
  reducers: {
    setClientId(state, action) {
      console.log(action);
      return { ...state, clientId: action.payload };
    },
    clearClientId(state) {
      return { ...state, clientId: "" };
    },
  },
});

export const { clearClientId, setClientId } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
