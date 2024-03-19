import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.user = null;
      state.error = null;
    },
    updateStart: (state) => {
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
