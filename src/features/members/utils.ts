import { Query, type Databases } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Member } from "./types";

interface GetMemberFromDBProps {
    databases: Databases;
    workspaceId: string;
    userId: string;
}

export async function getMember(props: GetMemberFromDBProps): Promise<Member | null>;
export function getMember(members: Member[], userId: string): Member | undefined;
export function getMember(
    propsOrMembers: GetMemberFromDBProps | Member[],
    userId?: string
): Promise<Member | null> | Member | undefined {
    // Case 1: Direct member lookup from array
    if (Array.isArray(propsOrMembers) && userId) {
        return propsOrMembers.find(member => member.userId === userId);
    }

    // Case 2: Database lookup
    const props = propsOrMembers as GetMemberFromDBProps;
    return props.databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal("workspaceId", props.workspaceId),
            Query.equal("userId", props.userId)
        ]
    ).then(response => response.documents[0] || null);
}