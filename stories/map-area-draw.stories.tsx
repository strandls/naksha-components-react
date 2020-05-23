import { object, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { defaultNakshaProps, MapAreaDraw } from "../src";

export default {
  title: "Components-Draw",
  decorators: [withKnobs]
};

export const toStorybook = () => {
  const onFeaturesChange = features => {
    console.log("features", features);
  };

  return (
    <MapAreaDraw
      defaultViewPort={object("ViewPort", defaultNakshaProps.viewPort)}
      mapboxApiAccessToken={text(
        "Mapbox Token",
        process.env.STORYBOOK_MAPBOX_TOKEN
      )}
      defaultFeatures={[]}
      onFeaturesChange={onFeaturesChange}
    />
  );
};

toStorybook.story = {
  name: "map-area-draw"
};
