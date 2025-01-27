import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ projectId: string; workspaceId: string }>;
}

const ProjectIdSettingsPage = async ({ params }: Props) => {
    const { projectId } = await params;
    const { workspaceId } = await params;
    const user = await getCurrent();

    if (!user) {
        return redirect("/sign-in");
    }

    const project = await getProject({ projectId });

    return (
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
            <EditProjectForm initialValues={project} />
            <span className="text-sm text-muted-foreground">Workspace ID: {workspaceId}</span>
        </div>
    );
}

export default ProjectIdSettingsPage;