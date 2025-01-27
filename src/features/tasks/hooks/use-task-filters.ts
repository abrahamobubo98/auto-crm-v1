'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { TaskStatus } from "../types";

type FilterState = {
  projectId: string | null;
  status: TaskStatus | null;
  assigneeId: string | null;
  search: string | null;
  dueDate: string | null;
};

type FilterSetters = {
  projectId: (value: string | null) => void;
  status: (value: TaskStatus | null) => void;
  assigneeId: (value: string | null) => void;
  search: (value: string | null) => void;
  dueDate: (value: string | null) => void;
};

export const useTaskFilters = (): [FilterState, FilterSetters] => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = (key: string) => searchParams.get(key);
  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const state: FilterState = {
    projectId: getParam('projectId'),
    status: getParam('status') as TaskStatus | null,
    assigneeId: getParam('assigneeId'),
    search: getParam('search'),
    dueDate: getParam('dueDate'),
  };

  const setters: FilterSetters = {
    projectId: (value) => setParam('projectId', value),
    status: (value) => setParam('status', value),
    assigneeId: (value) => setParam('assigneeId', value),
    search: (value) => setParam('search', value),
    dueDate: (value) => setParam('dueDate', value),
  };

  return [state, setters];
};
