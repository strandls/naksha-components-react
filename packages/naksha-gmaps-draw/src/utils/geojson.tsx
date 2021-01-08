import { GMAP_FEATURE_TYPES } from "../static/constants";

/**
 * Used with `<AutoComplete/>` component to convert search result to GeoJSON marker
 *
 * @param {*} place
 * @return {*}
 */
export const placeToGeoJsonFeature = (place) => {
  return {
    type: GMAP_FEATURE_TYPES.POINT,
    properties: {
      id: new Date().getTime(),
      name: place.name,
      formatted_address: place.formatted_address,
    },
    coordinates: Object.values(place.geometry.location.toJSON()).reverse(),
  };
};

/**
 * - converts geometry returned from data object to GeoJSON
 * - the reason for coverting this is so we can provide consistant onChange callback
 * - we *reverse* coordinates to keep compatibility with mapbox
 *
 * @param {*} geometry
 * @return {*}
 */
export const geometryToGeoJsonFeature = (geometry) => {
  const id = new Date().getTime();

  switch (geometry.getType()) {
    case GMAP_FEATURE_TYPES.POINT: {
      return {
        type: GMAP_FEATURE_TYPES.POINT,
        properties: { id },
        coordinates: Object.values(geometry.get().toJSON()).reverse(),
      };
    }

    case GMAP_FEATURE_TYPES.POLYGON: {
      const clist: any[] = [];
      geometry.forEachLatLng((c) => clist.push([c.lng(), c.lat()]));

      return {
        type: GMAP_FEATURE_TYPES.POLYGON,
        properties: { id },
        coordinates: [clist],
      };
    }

    default:
      return null;
  }
};
