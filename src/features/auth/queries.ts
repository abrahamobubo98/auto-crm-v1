import { cookies } from "next/headers";
import { Client, Account } from "node-appwrite";

import { AUTH_COOKIE } from "./constants";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
    try {
        const { account } = await createSessionClient();

        return await account.get();
    } catch (error) {
        return null;
    }
};