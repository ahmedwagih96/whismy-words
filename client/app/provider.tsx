"use client";

import { ReduxProvider } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </SessionProvider>
  );
}
