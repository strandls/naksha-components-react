import React from "react";
import { FullscreenControl, NavigationControl } from "react-map-gl";

export default function Navigation({ onViewportChange }) {
  return (
    <div className="mapboxgl-ctrl-top-right">
      <FullscreenControl />
      <NavigationControl onViewportChange={onViewportChange} />
    </div>
  );
}
