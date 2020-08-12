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
