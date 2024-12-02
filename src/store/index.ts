import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import reducer from './createSlice.ts'


export const store = configureStore({
  reducer
})