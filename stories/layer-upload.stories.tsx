import { Box } from "@chakra-ui/react";
import React from "react";

import { LayerUpload } from "../src";

export default {
  title: "Components"
};

export const LayerUpload1 = () => {
  const handleOnCallback = status => {
    console.debug(status);
  };

  return (
    <Box height="100vh" p={4} overflowY="auto">
      <LayerUpload
        nakshaEndpoint="http://localhost:8010/proxy/naksha-api/api/layer/upload"
        callback={handleOnCallback}
        bearerToken="Bearer x"
      />
    </Box>
  );
};
