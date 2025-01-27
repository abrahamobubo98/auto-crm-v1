import { redirect } from "next/navigation";

<<<<<<< HEAD
type Props = {
    params: Promise<{ workspaceId: string }>;
}

const WorkSpaceIdSettingsPage = async ({ params }: Props) => {
    const { workspaceId } = await params;
    const user = await getCurrent();
    
    if (!user) {
        return redirect("/sign-in");
    }

    const workspace = await getWorkspace({ workspaceId });

    if (!workspace) {
        redirect(`/workspaces/${workspaceId}`);
    }

    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={workspace} />
        </div>
    );
}

export default WorkSpaceIdSettingsPage;
=======
import { getCurrent } from "@/features/auth/queries";

import { WorkspaceIdSettingsClient } from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />
};
 
export default WorkspaceIdSettingsPage;
>>>>>>> temp-branch
