import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateTaskModal = () => {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get("create-task") === "true";

    const setIsOpen = useCallback((value: boolean) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set("create-task", "true");
        } else {
            url.searchParams.delete("create-task");
        }
        window.history.pushState({}, "", url);
    }, []);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen,
    };
};