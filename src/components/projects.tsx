"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateProjectModal } from "@/features/projects/hook/use-create-project-modal";
import { CreateProjectModal } from "@/features/projects/components/components/create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";

export const Projects = () => {
    const projectId = null; // TODO: use projectId hook
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    const { data } = useGetProjects({ workspaceId });
    const pathname = usePathname();
    const { open } = useCreateProjectModal();

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-xs uppercase text-neutral-500">Projects</p>
                    <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer opacity-75 transition hover:opacity-100"/>
                </div>
                {data?.documents.map((project) => {
                    const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
                    const settingsHref = `/workspaces/${workspaceId}/projects/${project.$id}/settings`;
                    const isActive = pathname === href;
                    return (
                        <div key={project.$id} className="flex items-center justify-between group">
                            <Link href={href} className="flex-1">
                                <div className={cn(
                                    "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                                    isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                                    )}
                                    >
                                    <ProjectAvatar 
                                        name={project.name}
                                        image={project.imageUrl}
                                    />
                                    <span className="truncate">{project.name}</span>
                                </div>
                            </Link>
                            <Link href={settingsHref}>
                                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition">
                                    <LuPencil className="size-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <CreateProjectModal />
        </>
    );
};
