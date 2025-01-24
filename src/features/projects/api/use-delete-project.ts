import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>;

interface DeleteProjectParams {
    projectId: string;
    workspaceId: string;
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ projectId }: DeleteProjectParams) => {
            const response = await client.api.projects.$delete({
                query: { projectId }
            });

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            return response.json();
        },
        onSuccess: (_, { workspaceId }) => {
            toast.success("Project deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            router.push(`/workspaces/${workspaceId}`);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete project");
        },
    });
}; 