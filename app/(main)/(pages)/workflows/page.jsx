import WorkflowButton from "./_components/Workflow-button";
import WorkflowsList from "./_components/workflows";

const Workflows = () => {
  return (
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Workflows
        <WorkflowButton />
      </h1>
      <WorkflowsList />
    </div>
  );
};

export default Workflows;
