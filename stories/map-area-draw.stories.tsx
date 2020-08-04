import { boolean, object, text, withKnobs } from "@storybook/addon-knobs";
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
      defaultFeatures={object("defaultFeatures", [])}
      onFeaturesChange={onFeaturesChange}
      isControlled={boolean("Is Controlled", true)}
      isPolygon={boolean("Is Polygon", false)}
      isReadOnly={boolean("Is ReadOnly", false)}
      isMultiple={boolean("Is Multiple", false)}
    />
  );
};

toStorybook.story = {
  name: "map-area-draw"
};
