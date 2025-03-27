import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../Utils/constants";
import { axiosInstance } from "../../Utils/axiosInstance";
import { encryptData } from "../../Utils/helpers";
// import axiosInstance from "@/configs/AxiosInstance";



export const login = createAsyncThunk(
  "userLogin",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios(`${apiUrl}auth/login`, {
        method: "POST",
        data: params
      }).then((response) => {
        if (response?.data?.status == "success") {
          const tempData = { ...response?.data?.data };
          tempData['status'] = response?.data?.status;
          tempData['username'] = "Jaikumar";
          tempData['id'] = 1;
          tempData['role'] = "admin";
          localStorage.setItem('udata', encryptData(tempData));
          axiosInstance.defaults.headers.common.accessToken = `${response?.data?.data?.access_token}`;
          return tempData;
        } else {
          return response?.data;
        }
      }).catch((err) => {
        return err;
      })
      return response
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const SiteAccountSettings = createAsyncThunk(
  "siteAccountSettings",
  async (data, thunkAPI) => {
    try {
      const response = await axios(`${apiUrl}accountsettings`, {
        method: "GET",
      }).then((response) => {
        return response?.data;
      }).catch((err) => {
        return err;
      })
      return response
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
