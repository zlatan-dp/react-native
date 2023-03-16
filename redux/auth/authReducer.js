import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(state, { payload }) {
      state.userId = payload.userId;
      state.login = payload.login;
      state.email = payload.email;
    },
    authStateChange(state, { payload }) {
      state.stateChange = payload.stateChange;
    },
    authSignOut(state) {
      state.userId = null;
      state.login = null;
      state.email = null;
      state.stateChange = false;
    },
  },
});
