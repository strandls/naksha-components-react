import { Meta } from "@storybook/react/types-6-0";
import React from "react";

import { defaultNakshaProps, MapAreaDraw } from "../src";

export default {
  title: "Components"
};

export const MapAreaDraw1 = () => {
  const onFeaturesChange = features => {
    console.log("features", features);
  };

  return (
    <MapAreaDraw
      defaultViewPort={defaultNakshaProps.viewPort}
      mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}
      defaultFeatures={[]}
      onFeaturesChange={onFeaturesChange}
      isControlled={true}
      isPolygon={false}
      isReadOnly={false}
      isMultiple={false}
    />
  );
};
