import { getAppwriteServerClient } from "@/lib/server/appwrite";

export const getCurrent = async () => {
    try {
        const client = await getAppwriteServerClient();
        if (!client) return null;
        return await client.account.get();
    } catch (error) {
        return null;
    }
};