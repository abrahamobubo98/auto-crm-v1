"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateWorkspaceForm } from "./create-workspace-form";

import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
<<<<<<< HEAD
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
=======
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
>>>>>>> temp-branch

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
