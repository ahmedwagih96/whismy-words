"use client";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
}
