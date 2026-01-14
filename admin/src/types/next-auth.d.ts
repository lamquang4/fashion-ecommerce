import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullname: string;
      birthday: string;
      phone: string;
      role: number;
    };
  }

  interface User {
    id: string;
    email: string;
    fullname: string;
    birthday: string;
    phone: string;
    role: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    fullname: string;
    birthday: string;
    phone: string;
    role: number;
  }
}
