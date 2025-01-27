import {
    Client,
    Account,
    Users,
    Databases
} from "node-appwrite";

// Create a client for browser-side usage
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

// Export instances for direct usage in client components
export const account = new Account(client);
export const databases = new Databases(client);

// Flexible client creation functions
export function createClient(session?: string) {
    const newClient = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    if (session) {
        newClient.setSession(session);
    }

    return newClient;
}

export function createClientWithSession(session: string) {
    const client = createClient(session);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        }
    }
}

export function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get users() {
            return new Users(client);
        },
        get databases() {
            return new Databases(client);
        }
    }
}