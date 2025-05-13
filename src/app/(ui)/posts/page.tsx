import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import DOMPurify from "dompurify";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // ISR/SSR yerine tam fetch için

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Tüm Yazılar
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></p>
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Devamını Oku →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
