import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { WorkspaceIdJoinClient } from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

<<<<<<< HEAD
    return <WorkspaceIdJoinClient />
=======
  return <WorkspaceIdJoinClient />
>>>>>>> temp-branch
};
 
export default WorkspaceIdJoinPage;
