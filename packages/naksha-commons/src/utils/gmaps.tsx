import { defaultViewPort } from "../static/naksha";

/**
 * transforms Mapbox viewport to Google Maps viewport
 *
 * @param {object} [vp=defaultViewPort] mapbox viewport
 * @param {number} [zoomOffset=1] auto adjest zoom level for google maps
 * @return {*}
 */
export const mapboxToGmapsViewPort = (vp = defaultViewPort, zoomOffset = 1) => {
  return {
    center: {
      lat: vp.latitude,
      lng: vp.longitude,
    },
    zoom: vp.zoom + zoomOffset,
  };
};
