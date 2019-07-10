import { Overlay, Spinner } from "office-ui-fabric-react";
import React from "react";

export default function OverlayComponent({ isLoading }) {
  return isLoading ? (
    <Overlay className="overlay" isDarkThemed={true}>
      <Spinner label="Loading..." labelPosition="right" />
    </Overlay>
  ) : null;
}
