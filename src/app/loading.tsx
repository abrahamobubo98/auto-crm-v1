import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-2">
            <Loader2 className="size-8 animate-spin" />
            <p className="text-sm text-muted-foreground">
                Loading...
            </p>
        </div>
    );
} 