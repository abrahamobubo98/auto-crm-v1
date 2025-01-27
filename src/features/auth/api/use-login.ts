import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
<<<<<<< HEAD
=======
import { useMutation, useQueryClient } from "@tanstack/react-query";
>>>>>>> temp-branch

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });

<<<<<<< HEAD
            const results = await response.json();
            console.log(results);
            return results;
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            toast.success("Logged in successfully");
        },
        onError: () => {
            toast.error("Failed to login");
        }
    });
=======
      if (!response.ok) {
        throw new Error("Failed to login");
      }
>>>>>>> temp-branch

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged in");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to log in");
    },
  });

  return mutation;
};
