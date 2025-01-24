import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateProjectModal = () => {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get("create-project") === "true";

    const setIsOpen = useCallback((value: boolean) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set("create-project", "true");
        } else {
            url.searchParams.delete("create-project");
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