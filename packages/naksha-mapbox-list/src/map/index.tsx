import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { emit, useListener } from "react-gbus";
import MapGL from "react-map-gl";

import useDebounce from "../hooks/use-debounce";
import useLayerManager from "../hooks/use-layer-manager";
import { useLayers } from "../hooks/use-layers";
import { defaultMapStyles } from "@ibp/naksha-commons";
import { updateWorldViewRef } from "@ibp/naksha-commons";
import InfoBar from "./infobar";
import Legend from "./legend";
import MarkersList from "./markers-list";
import Navigation from "./navigation";
import Popup from "./popup";
import Sidebar from "./sidebar";

export default function Map() {
  const {
    mapRef,
    loadToC,
    mapboxApiAccessToken,
    viewPort,
    setViewPort,
    baseLayer,
    layers,
    infobarData,
    clickPopup,
    setClickPopup,
    hoverPopup,
    setHoverPopup,
  } = useLayers();

  const {
    reloadLayers,
    onMapClick,
    onMapHover,
    renderHLData,
  } = useLayerManager();

  const debouncedViewPort = useDebounce(viewPort, 500);

  useListener(reloadLayers, ["STYLE_UPDATED"]);

  const onLoad = () => {
    mapRef?.current.getMap().on("style.load", () => {
      updateWorldViewRef(mapRef);
      emit("STYLE_UPDATED");
    });
  };

  useEffect(() => {
    reloadLayers();
  }, [layers?.length]);

  useEffect(() => {
    reloadLayers(true);
  }, [debouncedViewPort]);

  useEffect(() => {
    renderHLData();
  }, [infobarData]);

  return (
    <Box boxSize="100%" position="relative">
      <MapGL
        {...viewPort}
        width="100%"
        height="100%"
        mapStyle={baseLayer && defaultMapStyles[baseLayer].style}
        onLoad={onLoad}
        ref={mapRef}
        getCursor={() => "default"}
        onViewportChange={setViewPort}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onClick={onMapClick}
        onHover={onMapHover}
      >
        <Navigation onViewportChange={setViewPort} />
        <Legend />
        {clickPopup && <Popup data={clickPopup} set={setClickPopup} />}
        {!clickPopup && hoverPopup && (
          <Popup data={hoverPopup} set={setHoverPopup} closeButton={false} />
        )}
        <MarkersList />
      </MapGL>
      {loadToC && <Sidebar />}
      {infobarData?.length ? <InfoBar /> : null}
    </Box>
  );
}
