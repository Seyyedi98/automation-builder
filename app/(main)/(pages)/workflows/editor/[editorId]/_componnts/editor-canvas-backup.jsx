"use client";

import { useEditor } from "@/providers/editor-provider";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ReactFlow } from "@xyflow/react";

const initialNodes = [];
const initialEdges = [];

const EditorCanvas = (props) => {
  const { dispatch, state } = useEditor();

  //   const [nodes, setNodes] = useState(initialNodes);
  //   const [edges, setEdges] = useState(initialEdges);
  //   const [isWorkFlowLoading, setIsWorkFlowLoading] = useState(false);
  //   const [reactFlowInstance, setReactFlowInstance] = useState();

  //   const nodeTypes = useMemo(
  //     () => ({
  //       Action: EditorCanvasCardSingle,
  //       Trigger: EditorCanvasCardSingle,
  //       Email: EditorCanvasCardSingle,
  //       Condition: EditorCanvasCardSingle,
  //       AI: EditorCanvasCardSingle,
  //       Slack: EditorCanvasCardSingle,
  //       "Google Drive": EditorCanvasCardSingle,
  //       Notion: EditorCanvasCardSingle,
  //       Discord: EditorCanvasCardSingle,
  //       "Custom Webhook": EditorCanvasCardSingle,
  //       "Google Calendar": EditorCanvasCardSingle,
  //       Wait: EditorCanvasCardSingle,
  //     }),
  //     []
  //   );

  const pathname = usePathname();
  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <div
            style={{ width: "100%", height: "100%", paddingBottom: "70px" }}
            className="relative"
          >
            <ReactFlow
              className="w-[300px]"
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodes={state.editor.elements}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              fitView
              onClick={handleClickCanvas}
              nodeTypes={nodeTypes}
            ></ReactFlow>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default EditorCanvas;
