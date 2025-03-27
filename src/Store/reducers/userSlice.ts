import { createSlice } from "@reduxjs/toolkit";
import { login, SiteAccountSettings } from "../actions/userAction";

const initialState: any = {
  isLoading: false,
  isLoginLoading: false,
  error: null,
  accountSettingsResult: null,
  userData: null,
  cusDetails: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    resetLoginAuth: (state: any) => {
      (state.userData = []), (state.userData = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SiteAccountSettings.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(SiteAccountSettings.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.accountSettingsResult = action.payload;
    });
    builder.addCase(SiteAccountSettings.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state: any) => {
      state.isLoginLoading = true;
    });
    builder.addCase(login.fulfilled, (state: any, action) => {
      state.isLoginLoading = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state: any, action) => {
      state.isLoginLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetLoginAuth } = userSlice.actions;
export default userSlice.reducer;
