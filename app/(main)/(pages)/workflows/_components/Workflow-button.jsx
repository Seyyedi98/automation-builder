"use client";

import WorkflowForm from "@/app/components/forms/workflow-form";
import CutomModal from "@/app/components/global/Custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provder";
import { Plus } from "lucide-react";

const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();

  const handleClick = () => {
    setOpen(
      <CutomModal
        title="Create a workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks"
      >
        <WorkflowForm />
      </CutomModal>
    );
  };

  return (
    <Button size="icon" onClick={handleClick}>
      <Plus />
    </Button>
  );
};

export default WorkflowButton;
