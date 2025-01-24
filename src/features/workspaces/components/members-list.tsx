"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Link, MoreVerticalIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Avatar } from "@/components/ui/avatar";
import { Fragment } from "react";
import { MemberAvatar } from "@/features/members/components/members-avatar";
import { Separator } from "@/components/ui/separator";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

export const MembersList = () => {
    const  workspaceId  = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to remove this member?",
        "This action cannot be undone.",
        "destructive"
    );
    const { data } = useGetMembers({ workspaceId });
    const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
    const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: { memberId },
        });
    };

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;

        deleteMember({param: {memberId}}, {
            onSuccess: () => {
                toast.success("Member removed successfully");
                window.location.reload();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    };

    return (
        <Card className="w-full h-full">
            <ConfirmDialog/>
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <Button asChild variant="secondary" size="sm" className="text-xs">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Members
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
                <CardContent className="p-7">
                    {data?.documents.map((member, index) => (
                        <Fragment key={member.$id}>
                            <div className="flex items-center gap-2">
                                <MemberAvatar
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                        className="ml-auto"
                                        variant="secondary"
                                        size="icon"
                                        >
                                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="bottom" align="end">
                                        <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        disabled={isUpdatingMember}>
                                            Set as admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isUpdatingMember}>
                                            Set as member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        className="font-medium text-amber-700"
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isDeletingMember}>
                                            Remove {member.name}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {index < data?.documents.length - 1 && <Separator className="my-2.5"/>}
                        </Fragment>
                    ))}
                </CardContent>
            </div>
        </Card>
    );
};
