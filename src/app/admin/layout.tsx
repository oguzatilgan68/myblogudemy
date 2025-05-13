import Link from "next/link";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </header>
      <nav className="bg-gray-100 dark:bg-gray-800 px-6 py-2 flex gap-4">
        <Link href="/admin/posts" className="hover:underline">
          📋 Tüm Postlar
        </Link>
        <Link href="/admin/posts/add" className="hover:underline">
          ➕ Yeni Post
        </Link>
      </nav>
      <main className="flex-grow px-6 py-4">{children}</main>
    </div>
  );
}
