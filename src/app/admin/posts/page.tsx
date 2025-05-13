"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

const POSTS_PER_PAGE = 5;

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const deletePost = async (id: number) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Arama ve sıralama
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Post Yönetimi</h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <Link href="/admin/posts/add" className="text-blue-600 hover:underline">
          ➕ Yeni Post Ekle
        </Link>

        <input
          type="text"
          placeholder="Bir şeyler yaz..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Yeni aramada 1. sayfaya dön
          }}
          className="px-3 py-1 border rounded dark:bg-gray-800 dark:text-white"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
        >
          <option value="desc">📅 Yeni → Eski</option>
          <option value="asc">📅 Eski → Yeni</option>
        </select>
      </div>

      <ul className="space-y-4">
        {paginatedPosts.map((post) => (
          <li key={post.id} className="border p-4 rounded dark:border-gray-600">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 flex gap-4">
              <Link
                href={`/admin/posts/${post.id}`}
                className="text-green-600 hover:underline"
              >
                ✏️ Düzenle
              </Link>
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-600 hover:underline"
              >
                🗑️ Sil
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
