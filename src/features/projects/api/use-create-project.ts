import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.projects["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.projects["$post"]>;

export const useCreateProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType, 
        Error, 
        RequestType
    >({
        mutationFn: async ({form}) => {
            console.log("Making API call with form data:", form);
            const response = await client.api.projects["$post"]({ form });
            
            if (!response.ok) {
                console.error("Failed to create project:", response.status, response.statusText);
                throw new Error("Failed to create project");
            }

            const data = await response.json();
            console.log("API Response:", data);
            return data;
        },
        onSuccess: ({data}) => {
            console.log("Project created successfully:", data);
            toast.success("Project created successfully");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error) => {
            console.error("Error creating project:", error);
            toast.error(error.message || "Failed to create project");
        }
    });

    return mutation;
};