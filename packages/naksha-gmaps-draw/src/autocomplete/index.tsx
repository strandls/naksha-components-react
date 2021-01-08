import { GMAPS_AUTOCOMPLETE_FIELDS } from "@ibp/naksha-commons";
import { Autocomplete } from "@react-google-maps/api";
import React, { CSSProperties, useState } from "react";

import { placeToGeoJsonFeature } from "../utils/geojson";

const InputStyles: CSSProperties = {
  marginTop: "0.5rem",
  border: 0,
  width: "16rem",
  height: "2rem",
  padding: "0 0.5rem",
  borderRadius: "0.25rem",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
  outline: "none",
  textOverflow: "ellipses",
  position: "absolute",
  left: "50%",
  marginLeft: "-8rem",
};

export default function NakshaAutocomplete({ addFeature, gmapRegion }) {
  const [ac, setAc] = useState<any>();

  const onLoad = (autocomplete) => {
    setAc(autocomplete);
  };

  const onPlaceChanged = () => {
    const feature = placeToGeoJsonFeature(ac?.getPlace());
    addFeature(feature);
  };

  return (
    <Autocomplete
      onLoad={onLoad}
      fields={GMAPS_AUTOCOMPLETE_FIELDS}
      onPlaceChanged={onPlaceChanged}
      options={
        gmapRegion ? { componentRestrictions: { country: gmapRegion } } : {}
      }
    >
      <input type="text" placeholder="Search Location" style={InputStyles} />
    </Autocomplete>
  );
}
