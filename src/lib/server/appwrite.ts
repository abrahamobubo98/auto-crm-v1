import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { createClientWithSession } from "../appwrite";

export async function getAppwriteServerClient() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(AUTH_COOKIE);

        if (!session?.value) {
            return null;
        }

        return createClientWithSession(session.value);
    } catch (error) {
        return null;
    }
} 