"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provder";
import { Plus } from "lucide-react";

const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();
  const handleClick = () => {
    // setOpen(
    //     <CutomModal title="Create a workflow Automation"
    //     subheading="Workflows are a powerfull that help you automate tasks">
    //     <workflowform/>
    //     </CutomModal>
    // )
  };

  return (
    <Button size="icon" onClick={handleClick}>
      <Plus />
    </Button>
  );
};

export default WorkflowButton;
