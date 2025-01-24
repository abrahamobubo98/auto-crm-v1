"use client";

import {useRef} from "react";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "../../api/use-create-project";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateProjectFormProps {
    workspaceId: string;
    onSuccess?: () => void;
}

export const CreateProjectForm = ({ workspaceId, onSuccess }: CreateProjectFormProps) => {
    const router = useRouter();
    const { mutate: createProject, isPending } = useCreateProject();
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            workspaceId,
        },
    });

    const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
        const finalValues = {
            ...values,
            workspaceId,
            image: values.image instanceof File ? values.image : undefined,
        }

        console.log("Submitting project with values:", finalValues);

        createProject(
            { form: finalValues },
            {
                onSuccess: ({ data }) => {
                    console.log("Project created successfully:", data);
                    form.reset();
                    onSuccess?.();
                    router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
                },
                onError: (error) => {
                    console.error("Failed to create project:", error);
                }
            }
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create Project
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="Enter your project name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-y-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                        src={
                                                            field.value instanceof File ? URL.createObjectURL(field.value) : field.value
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-neutral-400"/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm">Project Icon</p>
                                                <p className="text-muted-foreground"> JPEG, PNG, SVG, max 1mb</p>
                                                <input
                                                className="hidden"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                type="file"
                                                ref={inputRef}
                                                disabled={isPending}
                                                onChange={handleImageChange}
                                                />
                                                {field.value ? (
                                                    <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="destructive"
                                                    size="xs"
                                                    className="w-fit mt-2"
                                                    onClick={
                                                        () => {
                                                            field.onChange(null);
                                                            if (inputRef.current) {
                                                                inputRef.current.value = "";
                                                            }
                                                        }
                                                    }
                                                    >Remove Image
                                                    </Button>
                                                ):(
                                                    <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="tertiary"
                                                    size="xs"
                                                    className="w-fit mt-2"
                                                    onClick={() => inputRef.current?.click()}
                                                    >
                                                    Upload Image
                                                </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSeparator className="py-7"/>
                        <div className="flex items-center justify-between">
                            <Button
                                type="submit"
                                size="lg"
                                variant="primary"
                                disabled={isPending}
                            >
                                {isPending ? "Creating..." : "Create Project"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};