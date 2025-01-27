import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

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