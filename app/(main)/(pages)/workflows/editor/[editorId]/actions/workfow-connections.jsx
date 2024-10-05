"use server";

import prisma from "@/lib/client";

export const onCreateNodesEdges = async (flowId, nodes, edges, flowPath) => {
  const flow = await prisma.workflows.update({
    where: {
      id: flowId,
    },
    data: {
      nodes,
      edges,
      flowPath: flowPath,
    },
  });

  if (flow) return { message: "flow saved" };
};

export const onFlowPublish = async (workflowId, state) => {
  const published = await prisma.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workfow publihed";
  return "Workflow unpublished";
};
