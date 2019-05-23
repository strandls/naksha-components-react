import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Layers } from "../..";

storiesOf("Layers", module).add("Layers", () => (
  <Layers
    mapboxToken={text(
      "Mapbox Token",
      process.env.STORYBOOK_MAPBOX_TOKEN || "pk.xxx"
    )}
    endpoint={text(
      "Endpoint",
      process.env.STORYBOOK_ENDPOINT || "https://indiabiodiversity.org"
    )}
    layersPanelClosed={boolean("Layers Panel Closed", false)}
  />
));
