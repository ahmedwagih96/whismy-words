"use client";

import { ReduxProvider } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <SessionProvider>{children}</SessionProvider>;
    </ReduxProvider>
  );
}
