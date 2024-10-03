import EditorProvider from "@/providers/editor-provider";
import React from "react";

const Page = () => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider></ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;
