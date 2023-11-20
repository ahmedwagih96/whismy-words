import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { userApi } from "./services/userApi";
import { postApi } from "./services/postApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware, postApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
