import { AuthProvider } from "./components/AuthProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ThemeProviderWrapper from "./components/ThemeProviderWrapper";
import "./globals.css";

export const metadata = {
  title: "Blogum",
  description: "Kişisel blog sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <AuthProvider>
          <ThemeProviderWrapper>
            <Navbar />
            <main className="min-h-screen px-4 py-6 max-w-4xl mx-auto">
              {children}
            </main>
            <Footer />
          </ThemeProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
