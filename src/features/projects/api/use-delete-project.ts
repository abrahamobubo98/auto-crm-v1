import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>;

export const useDeleteProject = () => {
<<<<<<< HEAD
    const queryClient = useQueryClient();
=======
  const queryClient = useQueryClient();
>>>>>>> temp-branch

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({ param });

<<<<<<< HEAD
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Project deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
        },
        onError: () => {
            toast.error("Failed to delete project");
        }
    });
=======
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
>>>>>>> temp-branch

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted");

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    }
  });

  return mutation;
};
