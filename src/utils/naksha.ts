import { GeoserverLayer } from "../interfaces/naksha";

/**
 * pre-processes layers list
 *
 */
export const parseGeoserverLayersXml = (
  layers,
  nakshaApiEndpoint,
  endpoint,
  workspace,
  selectedLayers
): GeoserverLayer[] => {
  const selectedLayersIDs = selectedLayers.map(({ id }) => id);

  return layers.map((l, index) => ({
    ...l,
    index,
    id: l.name,
    thumbnail: nakshaApiEndpoint + l.thumbnail,
    source: {
      type: "vector",
      scheme: "tms",
      tiles: [
        `${endpoint}/gwc/service/tms/1.0.0/${workspace}:${l.name}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ]
    },
    data: { styles: [] },
    isAdded: selectedLayersIDs.includes(l.name)
  }));
};

/**
 * Returns legend image URL for Geoserver Layer
 *
 * @param {GeoserverLayer} layer
 * @param {string} geoserverEndpoint
 * @returns {string}
 */
export const getLegendUrl = (
  layer: GeoserverLayer,
  geoserverEndpoint: string
) => {
  return `${geoserverEndpoint}/wms?request=getlegendgraphic&version=1.0.0&format=image/png&transparent=true&layer=${
    layer.id
  }&style=${layer.data.styles[layer.data.styleIndex].styleName}`;
};
