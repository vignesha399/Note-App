import { configureStore } from "@reduxjs/toolkit";
import reducer from './createSlice.ts'


export const store = configureStore({
  reducer,
  middleware: (get) => get({thunk: true}).concat()
})