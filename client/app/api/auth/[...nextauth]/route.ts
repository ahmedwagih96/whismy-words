import NextAuth from "next-auth";
import { request } from "@/utils/request";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const data = await request
          .post("/api/auth/login", {
            email,
            password,
          })
          .then(({ data }) => {
            return data;
          })
          .catch((error) => {
            throw new Error(JSON.stringify(error.response.data.error));
          });

        return data;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          isAdmin: token.isAdmin,
          profilePhoto: token.profilePhoto,
          token: token.token,
        },
      };
    },
    // pass in user to token
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.profilePhoto) {
        token.profilePhoto = session.profilePhoto;
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
          profilePhoto: user.image,
          token: user.token,
        };
      }
      return token;
    },
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
