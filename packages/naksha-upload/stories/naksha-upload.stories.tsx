import { Box } from "@chakra-ui/react";
import React from "react";

import { NakshaLayerUpload } from "../src";

export const NakshaLayerUploadStory = () => {
  const handleOnCallback = (status) => {
    console.debug(status);
  };

  return (
    <Box height="100vh" p={4} overflowY="auto">
      <NakshaLayerUpload
        endpoint="http://localhost:8010/proxy/naksha-api/api/layer/upload"
        callback={handleOnCallback}
        bearerToken="Bearer x"
      />
    </Box>
  );
};

const meta = {
  title: "@ibp/naksha-upload",
  component: NakshaLayerUpload,
};

export default meta;
