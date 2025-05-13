import { withAuth } from "next-auth/middleware";

// Oturum kontrolü yapan middleware
export default withAuth({
  pages: {
    signIn: "/adminLogin", // Giriş yapılmamışsa yönlenecek sayfa
  },
  callbacks: {
    authorized: ({ token, req }) => {
      // adminLogin sayfası için auth kontrolü yapma (aksi halde döngüye girer)
      const isLoginPage = req.nextUrl.pathname === "/adminLogin";
      if (isLoginPage) return true;

      // Eğer token varsa (yani giriş yapılmışsa) devam et
      return !!token;
    },
  },
});
