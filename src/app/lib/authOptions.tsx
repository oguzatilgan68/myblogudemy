// src/lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // Test kullanıcı örneği (prod'da DB bağlantısı olmalı)
        const user = {
          id: "1",
          name: "Test Kullanıcı",
          email: "test@mail.com",
          password: "123456",
        };

        if (email === user.email && password === user.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/adminLogin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
