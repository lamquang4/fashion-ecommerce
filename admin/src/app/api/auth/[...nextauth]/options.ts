import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/MongoConnect";
import bcrypt from "bcryptjs";
import User from "@/model/User";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) throw new Error("Email hoặc mật khẩu không đúng");

          if (![0, 1, 2].includes(user.role)) {
            throw new Error("Email hoặc mật khẩu không đúng");
          }

          if (user.status === 0) {
            throw new Error("Tài khoản đã bị khóa");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) throw new Error("Email hoặc mật khẩu không đúng");

          return {
            id: user._id.toString(),
            email: user.email,
            fullname: user.fullname,
            birthday: user.birthday,
            phone: user.phone,
            role: user.role,
          };
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullname = user.fullname;
        token.birthday = user.birthday;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.fullname = token.fullname;
        session.user.birthday = token.birthday;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
