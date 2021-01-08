import { GMAP_FEATURE_TYPES } from "../static/constants";

/**
 * Used with `<AutoComplete/>` component to convert search result to GeoJSON marker
 *
 * @param {*} place
 * @return {*}
 */
export const placeToGeoJsonFeature = (place) => {
  return {
    type: "Feature",
    properties: {
      id: new Date().getTime(),
      name: place.name,
      formatted_address: place.formatted_address,
    },
    geometry: {
      type: GMAP_FEATURE_TYPES.POINT,
      coordinates: Object.values(place.geometry.location.toJSON()),
    },
  };
};

/**
 * converts geometry returned from data object to GeoJSON
 * the reason for coverting this is so we can provide consistant onChange callback
 *
 * @param {*} geometry
 * @return {*}
 */
export const geometryToGeoJsonFeature = (geometry) => {
  const id = new Date().getTime();

  switch (geometry.getType()) {
    case GMAP_FEATURE_TYPES.POINT: {
      return {
        type: "Feature",
        properties: { id },
        geometry: {
          type: GMAP_FEATURE_TYPES.POINT,
          coordinates: Object.values(geometry.get().toJSON()),
        },
      };
    }

    case GMAP_FEATURE_TYPES.POLYGON: {
      const clist: any[] = [];
      geometry.forEachLatLng((c) => clist.push([c.lat(), c.lng()]));

      return {
        type: "Feature",
        properties: { id },
        geometry: {
          type: GMAP_FEATURE_TYPES.POLYGON,
          coordinates: [clist],
        },
      };
    }

    default:
      return null;
  }
};
