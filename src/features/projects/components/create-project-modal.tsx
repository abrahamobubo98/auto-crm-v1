"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateProjectForm } from "./create-project-form";

import { useCreateProjectModal } from "../hooks/use-create-project-modal";

export const CreateProjectModal = () => {
<<<<<<< HEAD
    const { isOpen, setIsOpen, close } = useCreateProjectModal();
=======
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
>>>>>>> temp-branch

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
