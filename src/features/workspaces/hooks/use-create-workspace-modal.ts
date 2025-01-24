import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateWorkspaceModal = () => {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get("create-workspace") === "true";

    const setIsOpen = useCallback((value: boolean) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set("create-workspace", "true");
        } else {
            url.searchParams.delete("create-workspace");
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