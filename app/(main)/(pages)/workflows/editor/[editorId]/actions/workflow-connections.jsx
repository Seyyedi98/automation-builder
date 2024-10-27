"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs/server";

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
  // console.log(workflowId, state);

  const published = await prisma.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workflow published";
  return "Workflow unpublished";
};
