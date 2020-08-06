import { object, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { defaultNakshaProps, Previewer } from "../src";

export default {
  title: "Previewer",
  decorators: [withKnobs]
};

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [45.17, -19.31],
            [46.93, -19.31],
            [46.93, -17.72],
            [45.17, -17.72],
            [45.17, -19.31]
          ]
        ]
      }
    }
  ]
};

export const toStorybook = () => {
  return (
    <Previewer
      defaultViewPort={object("ViewPort", defaultNakshaProps.viewPort)}
      mapboxApiAccessToken={text(
        "Mapbox Token",
        process.env.STORYBOOK_MAPBOX_TOKEN
      )}
      data={object("data", geojson)}
    />
  );
};

toStorybook.story = {
  name: "previewer"
};
