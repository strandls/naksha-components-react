import { ViewMode } from "@nebula.gl/edit-modes";
import React, { useEffect, useRef, useState } from "react";
import MapGL from "react-map-gl";
import { DrawPolygonMode, DrawRectangleMode, Editor } from "react-map-gl-draw";

import Navigation from "../../components/map/navigation";
import { MapAreaDrawProps } from "../../interfaces/naksha";
import {
  CURSOR_PENCIL,
  defaultMapStyles,
  defaultNakshaProps
} from "../../static/constants";
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
 * providing callback w/ raw features
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
  mapboxApiAccessToken,
  isControlled,
  isPolygon,
  isReadOnly,
  isMultiple
}: MapAreaDrawProps) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState(
    defaultViewPort || defaultNakshaProps.viewPort
  );
  const [features, setFeatures] = useState(defaultFeatures || []);

  useEffect(() => {
    if (onFeaturesChange) {
      if (features.length > 0) {
        onFeaturesChange(features);
      } else {
        onFeaturesChange([]);
      }
    }
  }, [features]);

  useEffect(() => {
    if (
      isControlled &&
      JSON.stringify(features) !== JSON.stringify(defaultFeatures)
    ) {
      setFeatures(defaultFeatures);
    }
  }, [defaultFeatures]);

  const onLoad = () => {
    updateWorldViewRef(mapRef);
    mapRef.current.getMap().on("style.load", () => {
      updateWorldViewRef(mapRef);
    });
  };

  const onUpdate = ({ editType, data }) => {
    if (editType === "addFeature") {
      setFeatures(isMultiple ? data : [data[data.length - 1]]);
    }
  };

  const clearFeatures = () => setFeatures([]);

  const getCursor = ({ isDragging }) =>
    isDragging ? "grabbing" : isReadOnly ? "grab" : CURSOR_PENCIL;

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
      getCursor={getCursor}
      onViewportChange={setViewPort}
      mapboxApiAccessToken={mapboxApiAccessToken}
    >
      <Navigation onViewportChange={setViewPort} />
      {!isReadOnly && <ClearFeatures onClick={clearFeatures} />}
      <Editor
        clickRadius={12}
        mode={
          isReadOnly
            ? new ViewMode()
            : isPolygon
            ? new DrawPolygonMode()
            : new DrawRectangleMode()
        }
        onUpdate={onUpdate}
        features={features}
        featureStyle={() => featureStyle}
      />
    </MapGL>
  );
}
