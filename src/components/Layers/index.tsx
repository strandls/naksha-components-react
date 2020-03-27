import "../../styles/index.scss";
import "../../styles/spacing.scss";

import { FluentCustomizations } from "@uifabric/fluent-theme";
import { Customizer, initializeIcons } from "office-ui-fabric-react";
import { Provider } from "outstated";
import React from "react";

import LayersStore from "../../stores/layers.store";
import Layers1 from "./layers";

export function Layers({ mapboxToken, endpoint, layersPanelClosed = false }) {
  initializeIcons();
  return (
    <Customizer {...FluentCustomizations}>
      <Provider stores={[LayersStore]}>
        <Layers1
          mapboxToken={mapboxToken}
          endpoint={endpoint}
          layersPanelClosed={layersPanelClosed}
        />
      </Provider>
    </Customizer>
  );
}
