import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { createClientWithSession } from "../appwrite";

export async function getAppwriteServerClient() {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE);

    if (!session || !session.value) {
        throw new Error("Unauthorized");
    }

    return createClientWithSession(session.value);
} 