import { Box } from "@chakra-ui/react";
import React from "react";

import { defaultNakshaProps, Naksha } from "../src";

export default {
  title: "Components"
};

const Popup = props => {
  return (
    <Box maxH="250px" overflow="auto" fontSize="sm">
      <button onClick={() => alert("Clicked")}>Clicked</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Box>
  );
};

const HoverPopup = ({ feature }) => {
  return <div>{feature?.properties?.count} Observations</div>;
};

const handleOnDownload = async layer => {
  return { success: true, data: "xyz" };
};

export const Naksha1 = () => (
  <Naksha
    viewPort={defaultNakshaProps.viewPort}
    loadToC={true}
    showToC={true}
    mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    nakshaApiEndpoint={process.env.STORYBOOK_NAKSHA_ENDPOINT}
    geoserver={JSON.parse(process.env.STORYBOOK_GEOSERVER)}
    onLayerDownload={handleOnDownload}
    /*
  layers={[
    {
      id: "global-observations",
      title: "Global Observations",
      isAdded: true,
      source: {
        type: "grid",
        endpoint:
          "http://localhost:8010/proxy/esmodule-api/api/v1/geo/aggregation"
      },
      onClick: Popup,
      onHover: HoverPopup,
      data: {
        index: "extended_observation",
        type: "extended_records",
        geoField: "location"
      }
    }
  ]}
  // markers={object("Markers", [
  //   { latitude: 21, longitude: 77, colorHex: "E53E3E" }
  // ])}
  */
  />
);
