"use client";

import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

export function DeletePost({ id }: { id: number }) {
  const router = useRouter();

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button
      aria-disabled={deletePost.isLoading}
      onClick={() => deletePost.mutate({ id })}
    >
      <a>{deletePost.isLoading ? "⌛" : "🗑️"}</a>
    </button>
  );
}
