import NextAuth from "next-auth";
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

        // Burada veritabanına bağlanıp kullanıcıyı doğrulamalısın
        // Bu örnek statik bir kullanıcı içindir:
        const user = {
          id: "1",
          name: "Test Kullanıcı",
          email: "test@mail.com",
          password: "123456", // Prod'da şifreler hashlenmiş olmalı
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
