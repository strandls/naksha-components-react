import { IconButton } from "office-ui-fabric-react/lib/Button";
import React from "react";

export function SidebarClosed({ isSidebar, toggleSidebar }) {
  return !isSidebar ? (
    <IconButton
      className="p-2 sidebar-open"
      iconProps={{ iconName: "ThumbnailView" }}
      onClick={toggleSidebar}
    />
  ) : null;
}

export function SidebarOpened({ toggleSidebar }) {
  return (
    <IconButton
      className="p-2 sidebar-close"
      iconProps={{ iconName: "ChromeClose" }}
      onClick={toggleSidebar}
    />
  );
}
