import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//This is the global store setup
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
