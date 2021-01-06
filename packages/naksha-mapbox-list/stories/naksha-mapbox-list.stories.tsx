import { Box } from "@chakra-ui/react";
import React from "react";

import { defaultNakshaProps, NakshaMapboxList } from "../src";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Popup = (props) => {
  return (
    <Box maxH="250px" overflow="auto" fontSize="sm">
      <button onClick={() => alert("Clicked")}>Clicked</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HoverPopup = ({ feature }) => {
  return <div>{feature?.properties?.count} Observations</div>;
};

const handleOnDownload = async (layer) => {
  console.debug(layer);
  return { success: true, data: "xyz" };
};

export const NakshaMapboxListStory = () => (
  <NakshaMapboxList
    viewPort={defaultNakshaProps.viewPort}
    loadToC={true}
    showToC={true}
    managePublishing={true}
    nakshaEndpointToken={process.env.STORYBOOK_NAKSHA_TOKEN || "ey.xyz"}
    mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN || "pk.xyz"}
    nakshaApiEndpoint="http://localhost:8010/proxy/naksha-api/api"
    geoserver={{
      endpoint: "http://localhost:8010/proxy/geoserver",
      store: "naksha",
      workspace: "biodiv",
    }}
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

const meta = {
  title: "@ibp/naksha-mapbox-list",
  component: NakshaMapboxList,
};

export default meta;
