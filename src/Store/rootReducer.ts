import { combineReducers } from '@reduxjs/toolkit';
import userSlice from "./reducers/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
