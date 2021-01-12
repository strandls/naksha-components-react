import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { defaultMapStyles } from "@ibp/naksha-commons";
import React from "react";

import { useLayers } from "../../hooks/use-layers";

export default function LayerSettings() {
  const { baseLayer, setBaseLayer } = useLayers();

  const onBaseLayerChange = (e) => {
    setBaseLayer(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel htmlFor="email">Base Style</FormLabel>
      <Select value={baseLayer} onChange={onBaseLayerChange}>
        {defaultMapStyles.map((s) => (
          <option key={s.key} value={s.key}>
            {s.text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
