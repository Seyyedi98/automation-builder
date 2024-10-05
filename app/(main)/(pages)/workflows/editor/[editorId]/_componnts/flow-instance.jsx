"use client";

import { Button } from "@/components/ui/button";
import { useNodeConnections } from "@/providers/connections-provider";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../actions/workfow-connections";
import { toast } from "sonner";

const FlowInstance = ({ children }) => {
  const pathName = usePathname();
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useNodeConnections();

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      pathName.split("/").pop(),
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );
    if (flow) toast.message(flow.message);
  }, [nodeConnection]);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split("/").pop(), true);
    if (response) toast.message(response);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        {/* You can't activate the flow, unless there is something in the flow */}
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
