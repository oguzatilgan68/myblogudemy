"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/app/components/BlogEditor";

type FormValues = {
  title: string;
  content: string;
};

export default function NewPostPage() {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-4"
    >
      <input
        {...register("title")}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        placeholder="Başlık"
        required
      />

      <Controller
        name="content"
        control={control}
        defaultValue=""
        render={({ field }) => <RichTextEditor field={field} />}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kaydet
      </button>
    </form>
  );
}
