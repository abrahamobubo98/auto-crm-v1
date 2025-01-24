"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error() {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="size-8 text-destructive" />
                <h2 className="text-xl font-semibold">Something went wrong!</h2>
                <p className="text-sm text-muted-foreground">
                    We encountered an error while processing your request.
                </p>
            </div>
            <Link href="/">
                <Button variant="secondary">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
} 