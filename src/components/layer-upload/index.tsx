import React from "react";

import LayerUploadS from "./layer-upload";
import {
  LayerUploadProvider,
  LayerUploadProviderProps
} from "./use-layer-upload";

export function LayerUpload(props: LayerUploadProviderProps) {
  return (
    <LayerUploadProvider {...props}>
      <LayerUploadS />
    </LayerUploadProvider>
  );
}
