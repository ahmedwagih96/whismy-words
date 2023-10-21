import { Session } from "next-auth";
import { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      isAdmin: boolean;
      token: string;
      profilePhoto: string;
    };
  }

  interface User {
    id: string;
    isAdmin: boolean;
    token: string;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
    token: string;
    profilePhoto: string;
  }
}
