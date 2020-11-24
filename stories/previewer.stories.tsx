import { Meta } from "@storybook/react/types-6-0";
import React from "react";

import { defaultNakshaProps, Previewer } from "../src";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [78, 30]
      }
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72, 20],
            [79, 20],
            [79, 24],
            [72, 24],
            [72, 20]
          ]
        ]
      }
    }
  ]
};

export default {
  title: "Components"
};

export const Previewer1 = () => {
  return (
    <Previewer
      defaultViewPort={defaultNakshaProps.viewPort}
      mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}
      data={geojson}
    />
  );
};
