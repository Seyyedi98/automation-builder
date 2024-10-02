import React from "react";
import Workflow from "./workflow";

const WorkflowsList = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6">
        <Workflow
          description="Creating a test workflow"
          id="2w3rder w3"
          name="Automation workflow"
          publish={false}
        />
      </section>
    </div>
  );
};

export default WorkflowsList;
