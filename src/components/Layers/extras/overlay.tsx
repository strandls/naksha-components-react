import { Overlay } from "office-ui-fabric-react/lib/Overlay";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import React from "react";

export default function OverlayComponent({ isLoading }) {
  return isLoading ? (
    <Overlay className="overlay" isDarkThemed={true}>
      <Spinner label="Loading..." labelPosition="right" />
    </Overlay>
  ) : null;
}
