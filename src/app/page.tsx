"use client";
import { Post } from "@/generated/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Bloglarım
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {posts.map((post: Post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition hover:shadow-xl"
          >
            <Link href={`/posts/${post.id}`} className="block">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {post.title}
              </h2>
            </Link>
            <p
              className="text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></p>
          </article>
        ))}
      </div>
    </main>
  );
}
