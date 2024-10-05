import React from "react";
import { Handle, useStore } from "@xyflow/react";
import { useEditor } from "@/providers/editor-provider";

const selector = (s) => {
  nodeInternals: s.nodeInternals;
  edges: s.edges;
};

const CustomHandle = (props) => {
  const { state } = useEditor();

  // each hadle can have one connector. Here we check if nodes can accept connection
  return (
    <Handle
      {...props}
      isValidConnection={(e) => {
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source
        ).length;
        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source
        );
        //target
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target
        ).length;

        if (targetFromHandleInState === 1) return false;
        if (sourceNode?.type === "Condition") return true;
        if (sourcesFromHandleInState < 1) return true;
        return false;
      }}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
    />
  );
};

export default CustomHandle;
