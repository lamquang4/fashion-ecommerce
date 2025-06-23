import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullname: string;
      birthday: string;
      phone: string;
      role: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    fullname: string;
    birthday: string;
    phone: string;
    role: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullname: string;
    birthday: string;
    phone: string;
    role: number;
  }
}
