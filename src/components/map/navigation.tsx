import { Box } from "@chakra-ui/core";
import React from "react";
import { FullscreenControl, NavigationControl } from "react-map-gl";

export default function Navigation({ onViewportChange }) {
  return (
    <Box className="mapboxgl-ctrl-top-right">
      <FullscreenControl />
      <NavigationControl onViewportChange={onViewportChange} />
    </Box>
  );
}
