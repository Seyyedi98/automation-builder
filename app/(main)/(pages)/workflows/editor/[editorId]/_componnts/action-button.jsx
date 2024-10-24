import React from "react";

const ActionButton = ({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}) => {
  const pathName = usePathName();

  const renderActionButton = () => {
    switch (currentService) {
      case "Discord":
        break;

      case "Notion":
        break;

      case "Slack":
        break;

      default:
        break;
    }
  };
};

export default ActionButton;
