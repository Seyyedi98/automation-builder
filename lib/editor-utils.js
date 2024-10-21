export const onDragStart = (e, nodeType) => {
  e.dataTransfer.setData("application/reactflow", nodeType);
  e.dataTransfer.effectAllowed = "move";
};

// check connections providet for setSlackNode, setDiscordNode and ...
export const onSlackContent = (nodeConnection, event) => {
  nodeConnection.setSlackNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onDiscordContent = (nodeConnection, event) => {
  nodeConnection.setDiscordNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onNotionContent = (nodeConnection, event) => {
  nodeConnection.setNotionNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onContentChange = (nodeConnection, nodeType, event) => {
  if (nodeType === "Slack") {
    onSlackContent(nodeConnection, event);
  } else if (nodeType === "Discord") {
    onDiscordContent(nodeConnection, event);
  } else if (nodeType === "Notion") {
    onNotionContent(nodeConnection, event);
  }
};

////////////////////////////////////////////////////////////////////

// Probably for sending custom messages
export const onAddTemplateSlack = (nodeConnection, template) => {
  nodeConnection.setSlackNode((prev) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplateDiscord = (nodeConnection, template) => {
  nodeConnection.setDiscordNode((prev) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplate = (nodeConnection, title, template) => {
  if (title === "Slack") {
    onAddTemplateSlack(nodeConnection, template);
  } else if (title === "Discord") {
    onAddTemplateDiscord(nodeConnection, template);
  }
};
