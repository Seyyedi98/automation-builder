import React from "react";
import Workflow from "./workflow";
import { onGetWorkflows } from "../_actions/workflow-connections";

const WorkflowsList = async () => {
  const workflows = await onGetWorkflows();
  return (
    <div className="flex flex-col gap-4 relative">
      <section className="flex flex-col m-2">
        {workflows?.length ? (
          workflows.map((flow) => <Workflow key={flow.id} {...flow} />)
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )}
      </section>
    </div>
  );
};

export default WorkflowsList;
