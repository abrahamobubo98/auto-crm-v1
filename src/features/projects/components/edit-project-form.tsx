"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";
import { UpdateProjectSchema, updateProjectSchema } from "../schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface EditProjectFormProps {
    initialValues: {
        $id: string;
        name: string;
        workspaceId: string;
    };
}

export const EditProjectForm = ({ initialValues }: EditProjectFormProps) => {
    const form = useForm<UpdateProjectSchema>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            name: initialValues.name,
        },
    });

    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

    const onSubmit = (values: UpdateProjectSchema) => {
        updateProject({
            projectId: initialValues.$id,
            form: values,
        });
    };

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        
        deleteProject({
            projectId: initialValues.$id,
            workspaceId: initialValues.workspaceId,
        });
    };

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter project name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isUpdating}>
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </Card>

            <Card className="p-6 border-destructive">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">
                        Once you delete a project, there is no going back.
                    </p>
                </div>
                <Button 
                    variant="destructive" 
                    className="mt-4"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    Delete Project
                </Button>
            </Card>
        </div>
    );
}; 