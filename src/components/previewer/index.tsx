import bbox from "@turf/bbox";
import React, { useEffect, useRef, useState } from "react";
import MapGL, { Layer, Source, WebMercatorViewport } from "react-map-gl";

import Navigation from "../../components/map/navigation";
import { PreviewerProps } from "../../interfaces/naksha";
import { defaultMapStyles, defaultNakshaProps } from "../../static/constants";
import { updateWorldViewRef } from "../../utils/view";

const featureStyle = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#f03b20",
    "fill-opacity": 0.2
  }
};

const pointStyle = {
  type: "circle",
  paint: {
    "circle-radius": 8,
    "circle-color": "#f03b20",
    "circle-opacity": 0.8
  },
  filter: ["==", ["geometry-type"], "Point"]
};

/**
 * Renders Provided geojson.
 *
 * @export
 * @param {PreviewerProps} {
 *   defaultViewPort,
 *   data,
 *   onFeaturesChange,
 *   baseLayer,
 *   mapboxApiAccessToken
 * }
 * @returns
 */
export function Previewer({
  defaultViewPort,
  data,
  baseLayer,
  mapboxApiAccessToken
}: PreviewerProps) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState(
    defaultViewPort || defaultNakshaProps.viewPort
  );

  const updateViewport = () => {
    if (!data) {
      return;
    }

    const b = bbox(data);
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewPort
    ).fitBounds([
      [b[0], b[1]],
      [b[2], b[3]]
    ]);

    setViewPort(o => ({
      ...o,
      longitude,
      latitude,
      zoom: zoom > viewPort.maxZoom ? viewPort.maxZoom : zoom - 0.2
    }));
  };

  const onLoad = () => {
    mapRef.current.getMap().on("style.load", () => {
      updateWorldViewRef(mapRef);
    });
    updateViewport();
  };

  useEffect(() => {
    updateViewport();
  }, [data]);

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
      onViewportChange={setViewPort}
      mapboxApiAccessToken={mapboxApiAccessToken}
    >
      <Navigation onViewportChange={setViewPort} />
      {data && (
        <Source type="geojson" data={data}>
          <Layer {...pointStyle} />
          <Layer {...featureStyle} />
        </Source>
      )}
    </MapGL>
  );
}
