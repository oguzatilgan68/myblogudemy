"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Mount kontrolü: Hydration hatasını önler
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const links = [
    {
      href: "/posts",
      label: "Gönderiler",
      className: "text-gray-700 dark:text-gray-300 hover:underline",
    },
    {
      href: "/about",
      label: "Hakkımda",
      className: "text-gray-700 dark:text-gray-300 hover:underline",
    },
    {
      href: "/contact",
      label: "İletişim",
      className: "text-gray-700 dark:text-gray-300 hover:underline",
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-800 dark:text-white"
        >
          Blogum
        </Link>

        <div className="items-center mx-auto">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-sm px-3 py-1 border rounded text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          )}
        </div>

        <div className="hidden lg:flex justify-between items-center py-4 px-6">
          <div className="flex space-x-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={link.className}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm px-3 py-1 border rounded text-red-600 border-red-400 hover:bg-red-100 dark:hover:bg-red-900"
          >
            Çıkış Yap
          </button>
        )}

        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-gray-300"
          >
            {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile menu kısmını buraya olduğu gibi taşıyabilirsin */}
    </nav>
  );
}
