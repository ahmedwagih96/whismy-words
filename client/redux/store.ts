import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { postApi } from "./services/postApi";
import { adminApi } from "./services/adminApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userApi.middleware,
      postApi.middleware,
      adminApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;