import { PrismaClient } from "@/generated/prisma";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();
export default async function PostDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Fetch the post data from the database
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <article className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="prose dark:prose-invert">
          <p
            className="text-gray-600 dark:text-gray-300 mb-4"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></p>
        </div>
      </article>
    </main>
  );
}
