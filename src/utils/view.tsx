import { adminBoundries } from "../static/constants";

/**
 * updates mapbox world view to load administrative boundaries
 *
 * @param {string} [country="IN"]
 */
export const updateWorldViewRef = (mapRef, country = "IN") => {
  if (mapRef) {
    adminBoundries.forEach(function(adminLayer) {
      mapRef.current
        .getMap()
        .setFilter(adminLayer, [
          "match",
          ["get", "worldview"],
          ["all", country],
          true,
          false
        ]);
    });
  }
};
