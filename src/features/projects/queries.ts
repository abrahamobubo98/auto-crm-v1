import { getAppwriteServerClient } from "@/lib/server/appwrite";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { Project } from "./types";

interface GetProjectProps {
    projectId: string;
}

export const getProject = async ({projectId}: GetProjectProps) => {
    const client = await getAppwriteServerClient();
    const user = await client.account.get();

    const project = await client.databases.getDocument<Project>(
        DATABASE_ID, 
        PROJECTS_ID,
        projectId
    );

    const role = project.members ? getMember(project.members, user.$id)?.role : null;

    return {
        ...project,
        role
    };
};