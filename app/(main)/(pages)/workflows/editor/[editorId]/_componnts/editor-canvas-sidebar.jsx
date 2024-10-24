"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from "@/lib/constant";
import {
  fetchBotSlackChannels,
  onConnections,
  onDragStart,
} from "@/lib/editor-utils";
import { useNodeConnections } from "@/providers/connections-provider";
import { useEditor } from "@/providers/editor-provider";
import { useFuzzieStore } from "@/store";
import { useEffect } from "react";
import EditorCanvasIconHelper from "./editor-canvas-card-icon";
import RenderConnectionAccordion from "./Render-connection-accordion";
import RenderOutputAccordion from "./render-output-accordion";

const EditorCanvasSidebar = ({ nodes }) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  const { googleFile, slackChannels } = useFuzzieStore();

  useEffect(() => {
    if (state) {
      onConnections(nodeConnection, state, googleFile);
    }
  }, [state]);

  useEffect(() => {
    if (nodeConnection.slackNode.slackAccssToken) {
      fetchBotSlackChannels(
        nodeConnection.slackNode.slackAccssToken,
        setSlackChannels
      );
    }
  }, [nodeConnection]);

  return (
    <aside>
      <Tabs defaultValue="actions" className="h-screen overflow-scroll pb-24">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />

        {/* Actions tab */}
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          {/* {Object.entries(EditorCanvasDefaultCardTypes).map(([_, cardType]) => {
            console.log(cardType);
          })} */}

          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") || // If no nodes, show existing trigger type nodes (GDrive and Action)
                (nodes.length && cardType.type === "Action") // If there is nodes, show Action type nodes
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) => onDragStart(event, cardKey)}
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        {/* Settings tab */}
        <TabsContent value="settings" className="-mt-6">
          <div className="px-2 py-4 text-center text-xl font-bold">
            {state.editor.selectedNode.data.title}
          </div>

          <Accordion>
            <AccordionItem value="Options" className="border-y-[1px] px-2">
              <AccordionTrigger className="!no-underline">
                Account
              </AccordionTrigger>
              <AccordionContent>
                {CONNECTIONS.map((connection) => (
                  <RenderConnectionAccordion
                    key={connection.title}
                    state={state}
                    connection={connection}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Expected Output" className="px-2">
              <AccordionTrigger className="!no-underline">
                Action
              </AccordionTrigger>
              <RenderOutputAccordion
                state={state}
                nodeConnection={nodeConnection}
              />
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
