import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { registerSchema } from "../schema";
import { z } from "zod";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType, 
        Error, 
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.register["$post"]({ json });
            if (!response.ok) {
                throw new Error("Failed to register");
            }
            
            return await response.json();
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            toast.success("Registered successfully");
        },
        onError: () => {
            toast.error("Failed to register");
        }
    });

    return mutation;
};