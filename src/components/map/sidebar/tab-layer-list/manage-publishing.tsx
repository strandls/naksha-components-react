import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import useLayerManager from "../../../../hooks/use-layer-manager";

export default function ManagePublishing({ layerStatus, layerId }) {
  const [isPublished, setIsPublished] = useState(layerStatus === "Active");
  const { publishLayer } = useLayerManager();

  const handleOnClick = v => {
    publishLayer(layerId);
    setIsPublished(v);
  };

  return (
    <Button
      variant="outline"
      colorScheme="green"
      size="sm"
      isDisabled={isPublished}
      onClick={handleOnClick}
    >
      {isPublished ? "Published" : "Publish"}
    </Button>
  );
}
