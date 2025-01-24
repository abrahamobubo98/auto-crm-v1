import { client } from "@/lib/rpc";

export const getProject = async (projectId: string) => {
    try {
        const response = await client.api.projects.$get({
            query: { projectId }
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch project");
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch project");
    }
}; 