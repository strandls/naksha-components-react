import React from "react";

import Map from "../components/map";
import { LayersProvider } from "../hooks/use-layers";
import { NakshaProps } from "../interfaces/naksha";
import { defaultNakshaProps } from "../static/constants";

export default function Naksha(props: NakshaProps) {
  return (
    <LayersProvider {...defaultNakshaProps} {...props}>
      <Map />
    </LayersProvider>
  );
}
