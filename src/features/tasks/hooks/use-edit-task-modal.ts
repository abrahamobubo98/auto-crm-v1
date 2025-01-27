'use client';

import { useRouter, useSearchParams } from "next/navigation";

export const useEditTaskModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("edit-task");

  const open = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("edit-task", id);
    router.push(`?${params.toString()}`);
  };

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit-task");
    router.push(`?${params.toString()}`);
  };

  const setTaskId = (id: string | null) => {
    if (id === null) {
      close();
    } else {
      open(id);
    }
  };

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
};
