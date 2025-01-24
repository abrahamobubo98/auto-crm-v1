"use client";

import { notFound } from "next/navigation";
import { getProject } from "@/features/projects/api/get-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface PageProps {
    params: {
        projectId: string;
        workspaceId: string;
    }
}

export default async function SettingsPage({ params }: PageProps) {
    const project = await getProject(params.projectId);

    if (!project) {
        notFound();
    }

    return (
        <div className="h-full p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Project Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your project settings and configuration
                </p>
            </div>
            <EditProjectForm initialValues={project} />
        </div>
    );
} 