import { useStore } from "outstated";
import React, { useEffect } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";

import LayersStore from "../../stores/layers.store";
import ControlPanel from "./control-panel";
import InfoPanel from "./info-panel";

export default function Layers({ mapboxToken, endpoint, layersPanelClosed }) {
  const layerStore = useStore(LayersStore);

  useEffect(() => {
    layerStore.init(endpoint, layersPanelClosed);
    // eslint-disable-next-line
  }, [mapboxToken, endpoint, layersPanelClosed]);

  const onViewportChange = (viewport: any) => {
    layerStore.setViewport(viewport);
  };

  return (
    <div className="ncr">
      <ReactMapGL
        {...layerStore.viewport}
        mapStyle={layerStore.mapStyle}
        height="100%"
        width="100%"
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={mapboxToken}
        onClick={layerStore.setHighlightLayers}
      >
        <div className="nav">
          <NavigationControl onViewportChange={onViewportChange} />
        </div>
      </ReactMapGL>
      <ControlPanel
        layers={layerStore.layers}
        layersMeta={layerStore.layersMeta}
        onMapStyleChange={layerStore.onMapStyleChange}
        mapStyleIndex={layerStore.mapStyleIndex}
        selectedLayersNames={layerStore.selectedLayersNames()}
        getSelectedStyleByLayerName={layerStore.getSelectedStyleByLayerName}
        setSelectedLayers={layerStore.setSelectedLayers}
        isLoading={layerStore.isLoading}
        isSidebar={layerStore.isSidebar}
        setIsSidebar={layerStore.setIsSidebar}
        endpoint={endpoint}
      />
      <InfoPanel
        highlightLayers={layerStore.highlightLayers}
        isInfobar={layerStore.isInfobar}
        setIsInfobar={layerStore.setIsInfobar}
      />
    </div>
  );
}
