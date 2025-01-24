import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WorkspaceAvatarProps {
    image?: string;
    name: string;
    className?: string;
}

export const WorkspaceAvatar = ({
    image,
    name,
    className
}: WorkspaceAvatarProps) => {
    if (image) {
        return (
            <div className={cn("relative size-10 overflow-hidden rounded-md",
            className)}>
                <Image src={image} alt={name} fill className="object-cover"/>
            </div>
        )
    }

    return (
        <Avatar className={cn("size-10 rounded-md", className)}>
            <AvatarFallback className={cn("text-white font-semibold bg-blue-600 text-lg uppercase rounded-md", className)}>
                {name.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};

