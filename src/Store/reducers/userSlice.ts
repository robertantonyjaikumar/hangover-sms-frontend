import { createSlice } from "@reduxjs/toolkit";
import { login, GetAllUsers, CreateNewUser, SiteAccountSettings, GetUserById, UpdateUser, DeleteUserById } from "../actions/userAction";

const initialState: any = {
  isLoading: false,
  isLoginLoading: false,
  error: null,
  success: null,
  updateSuccess: null,
  updateError: null,
  accountSettingsResult: null,
  userData: null,
  userDetails: null,
  getSingleDetails: null,
  deleteSuccess: null,
  deleteError: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    resetLoginAuth: (state: any) => {
      (state.userData = []), (state.userData = null);
    },
    resetSavedUser: (state: any) => {
      state.success = null;
      state.isLoading = false;
      state.isLoginLoading = false;
      state.error = null;
      state.updateSuccess = null;
      state.updateError = null;
      state.accountSettingsResult = null;
      state.userData = null;
      state.userDetails = null;
      state.getSingleDetails = null;
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
    builder.addCase(GetAllUsers.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(GetAllUsers.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(GetAllUsers.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(CreateNewUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewUser.fulfilled, (state: any, action) => {
      state.success = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CreateNewUser.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(GetUserById.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserById.fulfilled, (state: any, action) => {
      state.getSingleDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(GetUserById.rejected, (state: any, action) => {
      state.isLoading = false;
      state.getSingleDetails = null;
      state.error = action.payload;
    });
    builder.addCase(UpdateUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateUser.fulfilled, (state: any, action) => {
      state.updateSuccess = action.payload;
      state.isLoading = false;
    });
    builder.addCase(UpdateUser.rejected, (state: any, action) => {
      state.isLoading = false;
      state.updateError = action.payload;
    });

    builder.addCase(DeleteUserById.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteUserById.fulfilled, (state: any, action) => {
      state.deleteSuccess = action.payload;
      state.isLoading = false;
    });
    builder.addCase(DeleteUserById.rejected, (state: any, action) => {
      state.isLoading = false;
      state.deleteError = action.payload;
    });
  },
});

export const { resetLoginAuth, resetSavedUser } = userSlice.actions;
export default userSlice.reducer;
