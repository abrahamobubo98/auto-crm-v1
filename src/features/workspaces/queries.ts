import { Query } from "node-appwrite";

import { MEMBERS_ID, WORKSPACES_ID, DATABASE_ID } from "@/config";
import { Workspace } from "./types";
import { getMember } from "@/features/members/utils";
import { getAppwriteServerClient } from "@/lib/server/appwrite";

export const getWorkspaces = async () => {
    const client = await getAppwriteServerClient();
    const user = await client.account.get();

    const members = await client.databases.listDocuments(
        DATABASE_ID, 
        MEMBERS_ID, 
        [Query.equal("userId", user.$id)]
    );

    if (members.total === 0) {
        return {documents: [], total: 0};
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await client.databases.listDocuments<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        [Query.equal("$id", workspaceIds)]
    );

    return workspaces;
};

interface GetWorkspaceProps {
    workspaceId: string;
}

export const getWorkspace = async ({workspaceId}: GetWorkspaceProps) => {
    const client = await getAppwriteServerClient();
    const user = await client.account.get();

    const workspace = await client.databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId
    );

    const role = workspace.members ? getMember(workspace.members, user.$id)?.role : null;

    return {
        ...workspace,
        role
    };
};

interface GetWorkspaceInfoProps {
    workspaceId: string;
}

export const getWorkspaceInfo = async ({workspaceId}: GetWorkspaceInfoProps) => {
    const client = await getAppwriteServerClient();

    const workspace = await client.databases.getDocument<Workspace>(
        DATABASE_ID, 
        WORKSPACES_ID,
        workspaceId
    );

    return {
        name: workspace.name,
    };
};