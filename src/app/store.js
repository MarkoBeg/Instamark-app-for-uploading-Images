import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import commentReducer from "../features/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    comment: commentReducer,
  },
});
