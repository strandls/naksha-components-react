import { GMAPS_LIBRARIES, mapboxToGmapsViewPort } from "@ibp/naksha-commons";
import { Data, GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

import NakshaAutocomplete from "./autocomplete";
import NakshaFeatures from "./features";
import { GMAP_FEATURE_TYPES, GMAP_OPTIONS } from "./static/constants";
import { geometryToGeoJsonFeature } from "./utils/geojson";

export interface NakshaGmapsDrawProps {
  defaultViewPort?;
  defaultFeatures?: any[];
  onFeaturesChange?: Function;
  gmapApiAccessToken: string;
  isControlled?: boolean;
  isReadOnly?: boolean;
  isMultiple?: boolean;
  isAutocomplete?: boolean;
  gmapRegion?;
}

export function NakshaGmapsDraw({
  defaultViewPort,
  defaultFeatures,
  onFeaturesChange,
  gmapApiAccessToken,
  isControlled,
  isReadOnly,
  isMultiple,
  isAutocomplete,
  gmapRegion,
}: NakshaGmapsDrawProps) {
  const [viewPort] = useState(mapboxToGmapsViewPort(defaultViewPort));
  const [features, setFeatures] = useState(defaultFeatures || []);

  useEffect(() => {
    onFeaturesChange && onFeaturesChange(features);
  }, [features]);

  /**
   *  can simulate isControlled if `defaultFeatures` are going to be changed
   */
  useEffect(() => {
    if (
      isControlled &&
      JSON.stringify(features) !== JSON.stringify(defaultFeatures)
    ) {
      setFeatures(defaultFeatures || []);
    }
  }, [defaultFeatures]);

  const addFeature = (feature) => {
    setFeatures(isMultiple ? [...features, feature] : [feature]);
  };

  const onFeatureAdded = (geometry) => {
    const feature = geometryToGeoJsonFeature(geometry);
    addFeature(feature);
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={gmapApiAccessToken}
      region={gmapRegion}
      libraries={
        isAutocomplete ? GMAPS_LIBRARIES.AUTOCOMPLETE : GMAPS_LIBRARIES.DEFAULT
      }
    >
      <GoogleMap
        id="naksha-gmaps-draw"
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={viewPort.zoom}
        center={viewPort.center}
        options={GMAP_OPTIONS}
      >
        {isAutocomplete && (
          <NakshaAutocomplete addFeature={addFeature} gmapRegion={gmapRegion} />
        )}
        {!isReadOnly && (
          <Data
            options={{
              controls: [GMAP_FEATURE_TYPES.POINT, GMAP_FEATURE_TYPES.POLYGON],
              drawingMode: GMAP_FEATURE_TYPES.NONE,
              featureFactory: onFeatureAdded,
            }}
          />
        )}
        <NakshaFeatures data={features} />
      </GoogleMap>
    </LoadScriptNext>
  );
}
