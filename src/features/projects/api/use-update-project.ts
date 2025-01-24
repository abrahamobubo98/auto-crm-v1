import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateProjectSchema } from "../schemas";
import { client } from "@/lib/rpc";

interface UpdateProjectParams {
    projectId: string;
    form: UpdateProjectSchema;
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ projectId, form }: UpdateProjectParams) => {
            const response = await client.api.projects.$patch({
                query: { projectId },
                form,
            });

            if (!response.ok) {
                throw new Error("Failed to update project");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Project updated successfully");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update project");
        },
    });
}; 