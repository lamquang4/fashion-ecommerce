import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// cần next-auth.d.ts vì session.user của next-auth chỉ cho lưu các trường như name, email, image
//muốn lưu thêm như role, id, phone trong Session và JWT thì Typescript sẽ báo lỗi nên cần phải tạo next-auth.d.ts để khai báo dữ liệu
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullname: string;
      birthday: string;
      phone: string;
      role: number;
    } & DefaultSession["user"]; // DefaultSession['user'] lấy name, email, image
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
