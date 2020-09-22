import { Box } from "@chakra-ui/core";
import { boolean, object, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import Naksha, {
  CSSReset,
  defaultNakshaProps,
  theme,
  ChakraProvider
} from "../src";

export default {
  title: "Components",
  decorators: [withKnobs]
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

export const toStorybook = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Naksha
      viewPort={object("ViewPort", defaultNakshaProps.viewPort)}
      loadToC={boolean("Load ToC", true)}
      showToC={boolean("Show ToC", true)}
      mapboxApiAccessToken={text(
        "Mapbox Token",
        process.env.STORYBOOK_MAPBOX_TOKEN
      )}
      nakshaApiEndpoint={text(
        "Naksha Endpoint",
        process.env.STORYBOOK_NAKSHA_ENDPOINT
      )}
      geoserver={object(
        "Geoserver",
        JSON.parse(process.env.STORYBOOK_GEOSERVER)
      )}
      selectedLayers={object("Selected Layers", [])}
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
      markers={object("Markers", [
        { latitude: 21, longitude: 77, colorHex: "E53E3E" }
      ])}
    />
  </ChakraProvider>
);

toStorybook.story = {
  name: "naksha"
};
