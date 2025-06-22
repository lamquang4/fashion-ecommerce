import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import { connectMongoDB } from "@/lib/MongoConnect";
import bcrypt from "bcryptjs";

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
          if (!user) return null;

          if (![0, 1, 2, 3].includes(user.role)) {
            return null;
          }

          if (user.status === 0) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;

          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
