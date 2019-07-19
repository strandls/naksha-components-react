import { fromJS } from "immutable";
import { useEffect, useState } from "react";
import superagent from "superagent";
import WebMercatorViewport from "viewport-mercator-project";
import { xml2js } from "xml-js";

import { asyncForEach, parseBbox } from "../components/Layers/utils";
import { STYLES } from "../map-styles";
import { ENDPOINT_GEOSERVER } from "../utils/constants";

export default function LayersStore() {
  const [endpoint, setEndpoint] = useState();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isInfobar, setIsInfobar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [layers, setLayers] = useState([] as any);
  const [highlightLayers, _setHighlightLayers] = useState([] as any);
  const [selectedLayers, _setSelectedLayers] = useState([] as any);
  const [layersMeta, setLayersMeta] = useState(new Map());
  const [mapStyleIndex, setMapStyleIndex] = useState(0);
  const [mapStyle, setMapStyle] = useState(STYLES[mapStyleIndex].style);
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 79,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  useEffect(() => {
    updateLayers();
    // eslint-disable-next-line
  }, [mapStyleIndex, selectedLayers]);

  useEffect(() => {
    updateLayers(false);
    // eslint-disable-next-line
  }, [highlightLayers]);

  useEffect(() => {
    if (endpoint) {
      getAllLayers();
    }
    // eslint-disable-next-line
  }, [endpoint]);

  const init = (endpoint, layersPanelClosed) => {
    setEndpoint(endpoint);
    setIsSidebar(!layersPanelClosed);
  };

  /*
   * Selects map layer style like basic, streets, satellite etc
   */
  const onMapStyleChange = (e, item) => {
    STYLES.forEach((style, index) => {
      if (style.key === item.key) {
        setMapStyleIndex(index);
      }
    });
  };

  /*
   * If add = true then adds layer otherwise removes it
   */
  const setSelectedLayers = (item, add = true) => {
    _setSelectedLayers(a => {
      const filtered = a.filter(i => i.name !== item.name);
      return add ? [...filtered, item] : filtered;
    });
  };

  const selectedLayersNames = () => {
    return selectedLayers.map(i => i.name);
  };

  /*
   * Fetches all layers list from Geoserver
   */
  const getAllLayers = () => {
    setIsLoading(true);
    superagent
      .get(`${endpoint + ENDPOINT_GEOSERVER}/layers/biodiv/wfs`)
      .then(response => {
        const _json = xml2js(response.text, {
          compact: true,
          captureSpacesBetweenElements: true
        });

        let _layers = (
          _json["wfs:WFS_Capabilities"].FeatureTypeList || { FeatureType: [] }
        ).FeatureType;

        if (!Array.isArray(_layers)) {
          _layers = [_layers];
        }

        setLayers(
          _layers.map((f, index) => ({
            id: index,
            value: index,
            name: f.Name._text.split(":")[1],
            title: f.Title._text,
            abstract: f.Abstract._text,
            bbox: parseBbox(f),
            isAdded: false
          })) || []
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const getSelectedStyleByLayerName = layerName => {
    selectedLayers.forEach(sl => {
      if (sl.name === layerName) {
        return sl.selected;
      }
    });
    return Object.keys(layersMeta.get(layerName))[0];
  };

  /*
   * Triggers render for map
   */
  const updateLayers = async (isUpdateToBBox = true) => {
    let newMapStyle = STYLES[mapStyleIndex].style;
    const selectedLayers1: string[] = [];
    setIsLoading(true);

    // Selected Layers
    await asyncForEach(selectedLayers, async l => {
      const meta = await fetchLayer(l.name, l.selected);
      selectedLayers1.push(l.name);
      newMapStyle = newMapStyle
        .setIn(["sources", meta.name], meta.sources)
        .set("layers", newMapStyle.get("layers").push(meta.layers));
      updateToBBox(isUpdateToBBox, l.bbox);
    });

    // Selected Features
    await asyncForEach(highlightLayers, async l => {
      if (layersMeta.has(l.name) && selectedLayers1.includes(l.name)) {
        newMapStyle = newMapStyle.set(
          "layers",
          newMapStyle.get("layers").push(getHighlightMeta(l))
        );
      }
    });

    setIsLoading(false);
    setMapStyle(newMapStyle);
  };

  const updateToBBox = (isUpdateToBBox, bbox) => {
    if (isUpdateToBBox) {
      const viewportx = new WebMercatorViewport(viewport);
      const { longitude, latitude, zoom } = viewportx.fitBounds(bbox);
      setViewport(o => ({
        ...o,
        longitude,
        latitude,
        zoom
      }));
    }
  };

  /*
   * get modified layer, stringify & parse for preventing cloned layer issue
   */
  const getHighlightMeta = l => {
    let meta = fromJS(
      JSON.parse(
        JSON.stringify(
          layersMeta.get(l.name)[getSelectedStyleByLayerName(l.name)]
        )
      ).layers
    );
    meta = meta
      .set("id", `${l.name}-${l.featureId}-highlight`)
      .set("filter", ["in", "__mlocate__id", l.featureId]);
    switch (l.type) {
      case "fill":
        meta = meta.set("paint", {
          ...meta.get("paint").toJS(),
          "fill-outline-color": "red",
          "fill-color": "transparent"
        });
        break;

      case "circle":
        meta = meta.set("paint", {
          ...meta.get("paint").toJS(),
          "circle-stroke-color": "red",
          "circle-stroke-width": 1,
          "circle-opacity": 0
        });
        break;

      default:
        break;
    }
    return meta;
  };

  /*
   * This function will fetch layer Metadata and JSON plus also cache response into store
   */
  const fetchLayer = async (layerName, layerStyle: string = "default") => {
    await fetchLayerAllStyles(layerName);
    const _layerMeta = layersMeta.get(layerName);

    // Set default layer style if not specified
    if (layerStyle === "default") {
      layerStyle = Object.keys(_layerMeta)[0];
    }

    if (!_layerMeta[layerStyle].isLoaded) {
      const r2 = await superagent.get(
        `${endpoint + ENDPOINT_GEOSERVER}/styles/${layerStyle}.json`
      );
      const layerJsonName = r2.body.layers[0].id;
      r2.body.sources[layerJsonName].tiles = r2.body.sources[
        layerJsonName
      ].tiles.map(t => `${endpoint}${t}`);
      _layerMeta[layerStyle] = {
        ..._layerMeta[layerStyle],
        sources: r2.body.sources[layerJsonName],
        layers: r2.body.layers[0],
        name: layerJsonName,
        isLoaded: true
      };
      layersMeta.set(layerName, _layerMeta);
      setLayersMeta(layersMeta);
    }

    return _layerMeta[layerStyle];
  };

  const setHighlightLayers = (event: any) => {
    const hFeatures: any[] = [];
    event.features.forEach(f => {
      if (
        f.properties.hasOwnProperty("__mlocate__id") &&
        !f.layer.id.includes("-highlight")
      ) {
        const layerMeta = layersMeta.get(f.layer.id);
        const layerTitle = (
          layers.filter(l => l.name === f.layer.id)[0] || { title: f.layer.id }
        ).title;
        const properties = Object.entries(layerMeta).reduce(
          (o, [k, v]: [string, any]) => [
            ...o,
            {
              key: k,
              name: v.styleTitle,
              value: f.properties[k.replace(`${f.layer.id}_`, "")]
            }
          ],
          [] as any
        );

        hFeatures.push({
          name: f.layer.id,
          title: layerTitle,
          type: f.layer.type,
          featureId: f.properties.__mlocate__id,
          properties
        });
      }
    });
    _setHighlightLayers(hFeatures);
  };

  const fetchLayerAllStyles = async layerName => {
    if (layersMeta.has(layerName)) {
      return;
    }

    try {
      const response = await superagent.get(
        `${endpoint + ENDPOINT_GEOSERVER}/layers/${layerName}/styles`
      );
      const layerStyleNames = {};
      response.body.forEach(s => {
        layerStyleNames[s.styleName] = {
          styleTitle: s.styleTitle,
          isLoaded: false
        };
      });
      layersMeta.set(layerName, layerStyleNames);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    init,
    getSelectedStyleByLayerName,
    highlightLayers,
    isLoading,
    isSidebar,
    isInfobar,
    layers,
    layersMeta,
    mapStyle,
    mapStyleIndex,
    onMapStyleChange,
    selectedLayers,
    selectedLayersNames,
    setHighlightLayers,
    setIsSidebar,
    setIsInfobar,
    setSelectedLayers,
    setViewport,
    viewport,
    endpoint,
    setEndpoint
  };
}
