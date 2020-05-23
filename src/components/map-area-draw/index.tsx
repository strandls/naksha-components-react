import bboxPolygon from "@turf/bbox";
import React, { useEffect, useRef, useState } from "react";
import MapGL from "react-map-gl";
import { DrawRectangleMode, Editor } from "react-map-gl-draw";

import Navigation from "../../components/map/navigation";
import { MapAreaDrawProps } from "../../interfaces/naksha";
import { defaultMapStyles, defaultNakshaProps } from "../../static/constants";
import { updateWorldViewRef } from "../../utils/view";
import ClearFeatures from "./clear-features";

const featureStyle = {
  stroke: "#f03b20",
  fill: "#f03b20",
  strokeWidth: 2,
  strokeDasharray: "8,4",
  fillOpacity: 0.2
};

/**
 * Allows you to select rectangular region in a map.
 * providing callback w/ either bounding box or empty array and raw features as a second arguement
 *
 * @export
 * @param {MapAreaDrawProps} {
 *   defaultViewPort,
 *   defaultFeatures,
 *   onFeaturesChange,
 *   baseLayer,
 *   mapboxApiAccessToken
 * }
 * @returns
 */
export default function MapAreaDraw({
  defaultViewPort,
  defaultFeatures,
  onFeaturesChange,
  baseLayer,
  mapboxApiAccessToken
}: MapAreaDrawProps) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState(
    defaultViewPort || defaultNakshaProps.viewPort
  );
  const [features, setFeatures] = useState(defaultFeatures || []);

  useEffect(() => {
    if (onFeaturesChange) {
      if (features.length > 0) {
        onFeaturesChange(bboxPolygon(features[0]), features);
      } else {
        onFeaturesChange([], []);
      }
    }
  }, [features]);

  const onLoad = () => {
    updateWorldViewRef(mapRef);
    mapRef.current.getMap().on("style.load", () => {
      updateWorldViewRef(mapRef);
    });
  };

  const onUpdate = ({ editType, data }) => {
    if (editType === "addFeature") {
      setFeatures([data[data.length - 1]]);
    }
  };

  const clearFeatures = () => setFeatures([]);

  return (
    <MapGL
      {...viewPort}
      width="100%"
      height="100%"
      mapStyle={
        defaultMapStyles[baseLayer || defaultNakshaProps.baseLayer].style
      }
      onLoad={onLoad}
      ref={mapRef}
      getCursor={({ isDragging }) => (isDragging ? "grabbing" : "crosshair")}
      onViewportChange={setViewPort}
      mapboxApiAccessToken={mapboxApiAccessToken}
    >
      <Navigation onViewportChange={setViewPort} />
      <ClearFeatures onClick={clearFeatures} />
      <Editor
        clickRadius={12}
        mode={new DrawRectangleMode()}
        onUpdate={onUpdate}
        features={features}
        featureStyle={() => featureStyle}
      />
    </MapGL>
  );
}
