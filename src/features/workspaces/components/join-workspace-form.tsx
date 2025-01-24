"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { 
    Card, 
    CardContent, 
    CardDescription,
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    }
};


export const JoinWorkspaceForm = ({
    initialValues
    
}: JoinWorkspaceFormProps) => {
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    
    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`);
            },
        });
    };


    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You've been invited to join <strong>{initialValues.name}</strong>. Please enter the invite code to join.
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
                    <Button
                    asChild
                    variant="secondary"
                    type="button"
                    size="lg"
                    className="w-full lg:w-fit"
                    disabled={isPending}
                    >
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button 
                        className="w-full lg:w-fit"
                        size="lg"
                        type="button"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};