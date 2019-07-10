import { IconButton } from "office-ui-fabric-react";
import React from "react";

export function InfobarClosed({ isInfobar, toggleInfobar }) {
  return !isInfobar ? (
    <IconButton
      className="p-2 infobar-open"
      iconProps={{ iconName: "Info" }}
      onClick={toggleInfobar}
    />
  ) : null;
}

export function InfobarOpened({ toggleInfobar }) {
  return (
    <IconButton
      className="p-2 infobar-close"
      iconProps={{ iconName: "ChromeClose" }}
      onClick={toggleInfobar}
    />
  );
}
