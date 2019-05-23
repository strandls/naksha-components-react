import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { If } from "control-statements";
import React from "react";

import OverlayComponent from "../extras/overlay";
import { SidebarClosed, SidebarOpened } from "../extras/sidebar-buttons";
import PivotComponent from "./pivot";

export default function ControlPanel({
  layers,
  layersMeta,
  onMapStyleChange,
  mapStyleIndex,
  getSelectedStyleByLayerName,
  selectedLayersNames,
  setSelectedLayers,
  isLoading,
  isSidebar,
  setIsSidebar,
  endpoint
}) {
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <>
      <SidebarClosed isSidebar={isSidebar} toggleSidebar={toggleSidebar} />
      <If condition={isSidebar}>
        <div className="control-panel" style={{ boxShadow: Depths.depth64 }}>
          <div className="content">
            <SidebarOpened toggleSidebar={toggleSidebar} />
            <OverlayComponent isLoading={isLoading || layers.length <= 0} />
            <PivotComponent
              layers={layers}
              endpoint={endpoint}
              layersMeta={layersMeta}
              onMapStyleChange={onMapStyleChange}
              mapStyleIndex={mapStyleIndex}
              selectedLayersNames={selectedLayersNames}
              getSelectedStyleByLayerName={getSelectedStyleByLayerName}
              setSelectedLayers={setSelectedLayers}
            />
          </div>
        </div>
      </If>
    </>
  );
}
