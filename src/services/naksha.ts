import axios from "axios";
import cb from "colorbrewer";

import { geohashToJSON, getDataBins, getZoomConfig } from "../utils/grid";
import { parseGeoserverLayersXml } from "../utils/naksha";

export const axGetGeoserverLayers = async (
  nakshaEndpointToken,
  nakshaApiEndpoint,
  geoserver,
  selectedLayers
) => {
  try {
    const res = await axios.get(`${nakshaApiEndpoint}/layer/all`, {
      headers: { Authorization: nakshaEndpointToken }
    });
    return parseGeoserverLayersXml(
      res.data,
      nakshaApiEndpoint,
      geoserver.endpoint,
      geoserver.workspace,
      selectedLayers
    );
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const axGetGeoserverLayerStyleList = async (id, endpoint) => {
  try {
    const { data } = await axios.get(`${endpoint}/layer/onClick/${id}`);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axGetGeoserverLayerStyle = async (
  layername,
  workspace,
  styleName,
  endpoint
) => {
  try {
    const res = await axios.get(
      `${endpoint}/geoserver/workspaces/${workspace}/styles/${layername}_${styleName}.mbstyle`
    );
    return res.data?.layers?.[0];
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const getGridLayerData = async (
  url,
  bounds,
  zoom,
  payload = {},
  binCount = 6,
  colorScheme = "YlOrRd"
) => {
  try {
    const [precision, level, squareSize] = getZoomConfig(zoom);
    const { _ne, _sw } = bounds;
    const finalizedPayload = {
      top: _ne.lat,
      left: _sw.lng,
      bottom: _sw.lat,
      right: _ne.lng,
      precision,
      ...payload
    };

    const { data } = await axios.post(url, finalizedPayload);

    const geojson = geohashToJSON(data, level);
    const bins = getDataBins(data, binCount);
    const stops = bins.map((bin, index) => [
      bin,
      cb[colorScheme][binCount][index]
    ]);
    const paint = {
      "fill-color": {
        property: "count",
        default: "yellow",
        stops
      },
      "fill-outline-color": "rgba(0,0,0,0.2)",
      "fill-opacity": 0.7
    };

    return { success: true, geojson, paint, stops, squareSize };
  } catch (e) {
    console.error(e);
    return { success: false, geojson: {}, paint: {}, stops: [], squareSize: 0 };
  }
};

export const axDownloadLayer = async (endpoint, token, layerName) => {
  try {
    await axios.post(
      `${endpoint}/layer/download`,
      { layerName, attributeList: [], filterArray: [] },
      { headers: { Authorization: token } }
    );
  } catch (e) {
    console.error(e);
  }
};
